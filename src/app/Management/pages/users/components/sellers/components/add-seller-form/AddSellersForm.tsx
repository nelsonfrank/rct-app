/* eslint-disable @typescript-eslint/ban-types */
//dependencies
import React, { useEffect, useState, useContext } from 'react';
import { Input, Divider, Radio, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { navigate, RouteComponentProps } from '@reach/router';
import { Select } from 'antd';
import { country } from './country-dial';
import { useForm, SubmitHandler } from 'react-hook-form';
const { Option } = Select;
import { Auth } from '../../../../../../../../auth/AuthContext';
import Notification from '../../../../../../../components/notification';
// eslint-disable-next-line @typescript-eslint/no-var-requires

// API
import {
  AddSeller,
  GetAllPlatform,
  RefreshToken,
} from '../../../../../../../../API';
// styles
import './AddSellersForm.less';

const AddSellersForm: React.FC<RouteComponentProps> = () => {
  const [isTbsCertified, setisTbsCertified] = useState(false);
  const [idFileList, setIdFileState] = useState<any>([]);
  const [TBSFileList, setTBSFileState] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [allPlatform, setAllPlatform] = useState([]);

  const { register, handleSubmit, setValue, errors } = useForm({
    mode: 'onBlur',
  });
  const { adminAccessToken, userInfo } = useContext(Auth);

  useEffect(() => {
    const getAllPlatform = async () => {
      const result = await GetAllPlatform().then((response) => response);
      setAllPlatform(result.data.data.platform);
      console.log(result);
    };
    getAllPlatform();
  }, []);

  useEffect(() => {
    register('firstname', { required: true });
    register('lastname', { required: true });
    register('platform', { required: true });
    register('phone_number', { required: true });
    register('experience', { required: true });
    register('category', { required: true });
    register('scale_status', { required: true });
    register('address', { required: true });
    register('website');
    register('tbs_certificate_num');
    register('tbs_certificate_img');
    register('id_type', { required: true });
    register('id_num', { required: true });
    register('idImage', { required: true });
  }, [register]);

  const handleFirstNameChange = (e: any) => {
    setValue('firstname', e.target.value);
  };

  const handleLastNameChange = (e: any) => {
    setValue('lastname', e.target.value);
  };
  const handlePlatformSelectChange = (event: any) => {
    setValue('platform', event);
  };

  const handlePhoneNumberChange = (e: { target: { value: any } }) => {
    setValue('phone_number', e.target.value);
  };

  const handleExperinceSelectChange = (e: any) => {
    setValue('experience', e);
  };

  const handleCategorySelectChange = (e: any) => {
    setValue('category', e);
  };

  const handleScaleStatusChange = (e: any) => {
    setValue('scale_status', e);
  };

  const handleAdressInput = (e: any) => {
    setValue('address', e.target.value);
  };

  const handleSiteChange = (e: any) => {
    setValue('website', e.target.value);
  };

  const handleTBSCertifNumChange = (e: any) => {
    setValue('tbs_certificate_num', e.target.value);
  };
  const handleIdTypeChange = (value: any) => {
    setValue('id_type', value);
  };
  const handleIdNumChange = (e: any) => {
    setValue('id_num', e.target.value);
  };
  const Idprops = {
    name: 'file',
    onRemove: (file: any) => {
      const index = idFileList.indexOf(file);
      const newFileList = idFileList.slice();
      newFileList.splice(index, 1);
      setIdFileState(newFileList);
    },
    beforeUpload: (file: any) => {
      setIdFileState([...idFileList, file]);
      return false;
    },
    idFileList,
  };

  const TBSprops = {
    name: 'file',
    onRemove: (file: any) => {
      const index = TBSFileList.indexOf(file);
      const newFileList = TBSFileList.slice();
      newFileList.splice(index, 1);
      setTBSFileState(newFileList);
    },
    beforeUpload: (file: any) => {
      setTBSFileState([...TBSFileList, file]);
      return false;
    },
    TBSFileList,
  };

  const handleIDImageChange = (event: any) => {
    console.log(event);
    const file = event.file;
    const reader = new FileReader();
    (reader.onload = (e: any) => {
      setValue('idImage', e.target.result);
    }),
      reader.readAsDataURL(file);
  };

  const openCoverFile = () => {
    document.querySelectorAll('input')[0].click();
  };

  const handleTSBImageChange = (event: any) => {
    const file = event.file;
    const reader = new FileReader();
    (reader.onload = (e: any) => {
      setValue('tbs_certificate_img', e.target.result);
    }),
      reader.readAsDataURL(file);
  };

  type FormValues = {
    firstname: string;
    lastname: string;
    address: string;
    website: string;
    experience: string;
    tbs_certificate_num: string;
    id_type: string;
    id_num: string;
    phone_number: string;
    password: string;
    scale_status: string;
    id_image: any;
    tbs_certificate_img: any;
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const value = {
      user: {
        dial_code: '+255',
        phone_number: data.phone_number,
        name: `${data.firstname} ${data.lastname}`,
        role: 'seller',
      },
      seller: {
        first_time: data.firstname,
        last_name: data.lastname,
        application_type: data.scale_status,
        address: data.address,
        website: data.website,
        grade: '2',
        experience: data.experience,
        tbs_certification_number: data.tbs_certificate_num,
        certification_number: data.id_num,
        card_type: data.id_type,
        variety_name: 'kyela',
      },
      certificate: data.tbs_certificate_img,
      card: data.id_image,
    };

    setLoading(true);
    console.log(userInfo);
    const createSellerAccount = async () => {
      const result = await AddSeller(value, userInfo.id, adminAccessToken).then(
        (response) => response,
      );
      setLoading(false);
      console.log(result);
      if (result.status === 200) {
        navigate(-1);
        Notification(true, 'Seller Account Created Successfully');
      } else if (result.message === `Request failed with status code 401`) {
        const token = sessionStorage.getItem('refreshToken');
        const refreshToken = {
          refresh_token: token,
        };
        const refreshTokenCall = async () => {
          const response = await RefreshToken(refreshToken).then(
            (response) => response,
          );

          if (response.status === 201) {
            sessionStorage.setItem('accessToken', response.data.data.token);
            sessionStorage.setItem(
              'refreshToken',
              response.data.data.refreshToken,
            );
            const createSellerAgain = async () => {
              const newUser = await AddSeller(
                value,
                userInfo.id,
                response.data.data.token,
              ).then((response) => response);
              if (newUser.status === 200) {
                navigate(-1);
                Notification(true, 'Seller Account Created Successfully');
              }
            };
            createSellerAgain();
          }
        };
        refreshTokenCall();
      } else {
        Notification(false, 'Fail to Create Seller Account');
        setLoading(false);
      }
    };
    createSellerAccount();
  };

  return (
    <div style={{ minHeight: '90vh', marginTop: '2rem' }}>
      <div className="form-header">
        <h1>Add Sellers</h1>
      </div>
      <form
        className="add-seller-form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Divider style={{ marginTop: 0 }} />
        <div className="add-sellers-name">
          <div className="add-sellers-name_item">
            <Input
              placeholder="First Name"
              size="large"
              onChange={handleFirstNameChange}
            />
            <span style={{ fontSize: '1rem', color: 'red' }}>
              {errors.firstname && 'First name is required'}
            </span>
          </div>
          <div className="add-sellers-name_item">
            <Input
              placeholder="Last Name"
              size="large"
              onChange={handleLastNameChange}
            />
            <span style={{ fontSize: '1rem', color: 'red' }}>
              {errors.lastname && 'Last name is required'}
            </span>
          </div>
        </div>
        <div className="add-seller-input">
          <Select
            size="large"
            showSearch
            style={{ width: '100%' }}
            placeholder="Select Country"
            value="Tanzania"
            disabled
          >
            {country.map((item) => (
              <Option key={item.code} value={item.code}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="add-sellers-name">
          <div className="add-sellers-name_item">
            <Select
              style={{ width: '100%' }}
              size="large"
              placeholder="Platform"
              onChange={handlePlatformSelectChange}
            >
              {allPlatform.map((item: any) => (
                <Option key={item.id} value={item.platform_name}>
                  {item.platform_name}
                </Option>
              ))}
            </Select>
            <span style={{ fontSize: '1rem', color: 'red' }}>
              {errors.platform && 'Platform is required'}
            </span>
          </div>
        </div>
        <div className="add-seller-input">
          <Input
            addonBefore={'+255'}
            placeholder="PhoneNumber"
            maxLength={9}
            size="large"
            // ref={register({ pattern: /^\d+$/, max: 9 })}
            onChange={handlePhoneNumberChange}
          />
          <span style={{ fontSize: '1rem', color: 'red' }}>
            {errors.phone_number && 'Phone Number is required'}
          </span>
        </div>
        <div className="add-seller-input">
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="Experience"
            // ref={register({ required: true })}
            onChange={handleExperinceSelectChange}
          >
            <Option value="0-5">0 - 5 years</Option>
            <Option value="6-10">6 - 10 years</Option>
            <Option value="11-20">11 - 20 years</Option>
            <Option value="21+">21 years - above</Option>
          </Select>
          <span style={{ fontSize: '1rem', color: 'red' }}>
            {errors.experience && 'Experience is required'}
          </span>
        </div>
        <div className="add-seller-input">
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="Applicant Category"
            onChange={handleCategorySelectChange}
          >
            <Option value="individual">Individual</Option>
            <Option value="association">Association</Option>
            <Option value="company">Company</Option>
          </Select>
          <span style={{ fontSize: '1rem', color: 'red' }}>
            {errors.category && 'Applicant category is required'}
          </span>
        </div>
        <div className="add-seller-input">
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="Scale Status"
            onChange={handleScaleStatusChange}
          >
            <Option value="small">Small</Option>
            <Option value="medium">Medium</Option>
            <Option value="large">Large</Option>
          </Select>
          <span style={{ fontSize: '1rem', color: 'red' }}>
            {errors.scale_status && 'Scale Status is required'}
          </span>
        </div>
        <div className="add-seller-input">
          <Input
            placeholder="P.O Box Address"
            size="large"
            onChange={handleAdressInput}
          />
          <span style={{ fontSize: '1rem', color: 'red' }}>
            {errors.address && 'Address is required'}
          </span>
        </div>
        <div className="add-seller-input">
          <Input
            placeholder="Website"
            size="large"
            onChange={handleSiteChange}
          />
        </div>
        <div className="add-seller-input">
          <p style={{ marginLeft: '0.5rem', marginBottom: '0rem' }}>
            TBS Certified?
          </p>
          <Radio.Group
            size="large"
            onChange={() => setisTbsCertified(!isTbsCertified)}
            value={isTbsCertified}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
        <div className="add-sellers-name">
          <div className="add-sellers-name_item">
            <Input
              placeholder="TBS Certification Number"
              size="large"
              disabled={!isTbsCertified}
              onChange={handleTBSCertifNumChange}
            />
          </div>
          <div className="add-sellers-name_item">
            <Upload
              {...TBSprops}
              style={{ width: '100%' }}
              accept="image/*"
              onChange={(e) => handleTSBImageChange(e)}
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                disabled={!isTbsCertified}
                onChange={openCoverFile}
              >
                Attach TBS Certificate Image
              </Button>
            </Upload>
          </div>
        </div>
        <div className="add-seller-input">
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="Select Your Identification"
            onChange={handleIdTypeChange}
          >
            <Option value="voter">Voter Id</Option>
            <Option value="nida">National Id</Option>
            <Option value="driving-license">Driving License Id</Option>
          </Select>
          <span style={{ fontSize: '1rem', color: 'red' }}>
            {errors.id_type && 'Identification Category is required'}
          </span>
        </div>
        <div className="add-sellers-name">
          <div className="add-sellers-name_item">
            <Input
              placeholder="Add Id Number"
              size="large"
              onChange={handleIdNumChange}
            />
            <span style={{ fontSize: '1rem', color: 'red' }}>
              {errors.id_num && 'Id Number is required'}
            </span>
          </div>
          <div className="add-sellers-name_item">
            <Upload
              {...Idprops}
              style={{ width: '100%' }}
              accept="image/*"
              onChange={(e) => handleIDImageChange(e)}
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                onClick={openCoverFile}
              >
                Attach Identification Image
              </Button>
            </Upload>
          </div>
        </div>
        <div className="add-seller-input">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSellersForm;
