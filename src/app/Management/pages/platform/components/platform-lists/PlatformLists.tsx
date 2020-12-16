import React from 'react';
//dependencies
import { RouteComponentProps, navigate } from '@reach/router';
import { Button } from 'antd';

// Components
import Card from '../../../../../components/card';
// Styles
import './PlatformList.less';

// export interface PlatformListsProps {}

const PlatformLists: React.FC<RouteComponentProps> = () => {
  const handleAddPlatform = () => {
    navigate('platforms/add-platform-form');
  };
  return (
    <>
      <div className="platform-container">
        <div className="platform-heading">
          <Button size="large" type="primary" onClick={handleAddPlatform}>
            Add Platform
          </Button>
        </div>

        <div className="platformlist-row">
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 1</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 2</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 3</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
          <Card
            className="platformlist-card"
            styles={{ margin: '1rem 1.125rem' }}
          >
            <h3>platformlist-Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlatformLists;
