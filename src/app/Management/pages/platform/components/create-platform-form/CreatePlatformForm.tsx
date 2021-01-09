import React, { useEffect, useContext } from 'react';

// dependence
import { Input, Select, Button } from 'antd';
import { RouteComponentProps } from '@reach/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreatePlatform, CreateLeader } from '../../../../../../API';
import { Auth } from '../../../../../../auth/AuthContext';
// components
import BackButton from '../../../../components/back-button';
import { image } from './image_base64';
// Styles
import './CreatePlatform.less';

import { region } from './country-dial';
// export interface CreatePlatformFormProps {}

const { Option } = Select;
type FormValues = {
  platform_name: string;
  platform_country_dial_code: string;
  platform_region: string;
  phone_number: string;
  first_name: string;
  surname: string;
};
const CreatePlatformForm: React.FC<RouteComponentProps> = () => {
  const { userAccessToken, userRole } = useContext(Auth);
  const [countrySelected, setcountrySelected] = React.useState('');

  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    console.log(userRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    register('platform_name');
    register('platform_region');
    register('first_name');
    register('surname');
    register('phone_number');
  }, [register]);

  const handleOnSelectChange = (value: any) => {
    setcountrySelected(value);
    setValue('platform_region', value);
    console.log(countrySelected);
  };

  const handlePlatformNameChange = (e: { target: { value: any } }) => {
    setValue('platform_name', e.target.value);
  };

  const handleFirstNameChange = (e: { target: { value: any } }) => {
    setValue('first_name', e.target.value);
  };

  const handleSurnameChange = (e: { target: { value: any } }) => {
    setValue('surname', e.target.value);
  };
  const handlePhoneNumberChange = (e: { target: { value: any } }) => {
    setValue('phone_number', e.target.value);
  };
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const platformValue = {
      platform_name: data.platform_name,
      platform_country_dial_code: '+255',
      platform_region: data.platform_region,
      image_string: image,
    };

    const platformLeaderInfo = {
      dial_code: '+255',
      phone_number: data.phone_number,
      name: `${data.first_name} ${data.surname}`,
    };

    console.log(platformLeaderInfo);
    const AddPlatform = async () => {
      const result = await CreatePlatform(platformValue, userAccessToken).then(
        (response) => response,
      );
      if (result.status === 200) {
        const createLeader = async () => {
          const value = await CreateLeader(
            platformLeaderInfo,
            result.data.data,
            userAccessToken,
          ).then((response) => response);
          console.log(value);
        };
        createLeader();
      } else {
        console.log(result);
      }
      console.log(result);
    };
    AddPlatform();
  };
  return (
    <>
      <BackButton routes="dashboard/platforms" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="create-platform-container"
      >
        <h1 className="create-platform-header">Create Platform</h1>
        <hr className="platform-divider" />
        <h3 className="platform-info">Platform Information</h3>
        <div>
          <Input
            placeholder="Platform Name"
            size="large"
            onChange={handlePlatformNameChange}
          />
        </div>
        <div className="create-platform-location">
          <div className="platform-location-options">
            <Input value="Tanzania" disabled size="large" />
          </div>
          <div className="platform-location-options">
            <Select
              size="large"
              showSearch
              style={{ width: '100%' }}
              placeholder="Region"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => handleOnSelectChange(e)}
            >
              {region.map((item) => (
                <Option key={item.city} value={item.admin_name}>
                  {item.admin_name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <h3 className="platform-info">Add Platform Leader</h3>

          <div>
            <div className="create-platform-location">
              <div className="platform-location-options">
                <Input
                  placeholder="First Name"
                  size="large"
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="platform-location-options">
                <Input
                  placeholder="Surname"
                  size="large"
                  onChange={handleSurnameChange}
                />
              </div>
            </div>
            <div className="create-platform-location">
              <div
                className="platform-location-options"
                style={{ width: '100%' }}
              >
                <Input
                  placeholder="Phone Number"
                  size="large"
                  onChange={handlePhoneNumberChange}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2.5rem',
          }}
        >
          <Button size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreatePlatformForm;
