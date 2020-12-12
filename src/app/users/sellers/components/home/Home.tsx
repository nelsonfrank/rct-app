import React from 'react';

// Components
import Header from '../../../components/header';
import CardSection from '../../../components/section-card-list';
import Card from '../../../../components/card';
import { RouteComponentProps } from '@reach/router';
//Styles
import './Home.less';
// export interface HomeProps {}

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Header />
      <div className="seller--card_group">
        <Card
          subtitle="Tender Request"
          className="seller--card"
          styles={{ margin: '0.5rem 0' }}
        >
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              recusandae earum sequi vero blanditiis aliquid impedit eos aut vel
              reprehenderit velit sunt natus voluptates iure, facere neque nemo
              non culpa.
            </p>
          </div>
        </Card>
        <Card
          subtitle="Tender Bid"
          className="seller--card"
          styles={{ margin: '0.5rem 0' }}
        >
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              recusandae earum sequi vero blanditiis aliquid impedit eos aut vel
              reprehenderit velit sunt natus voluptates iure, facere neque nemo
              non culpa.
            </p>
          </div>
        </Card>
        <Card
          subtitle="Price Rate"
          className="seller--card"
          styles={{ margin: '0.5rem 0' }}
        >
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              recusandae earum sequi vero blanditiis aliquid impedit eos aut vel
              reprehenderit velit sunt natus voluptates iure, facere neque nemo
              non culpa.
            </p>
          </div>
        </Card>
        <CardSection title="Recent Tender Bids" route="tender-bids" />
        <CardSection title="Shop by Buyers" route="buyers-list" />
      </div>
    </>
  );
};

export default Home;