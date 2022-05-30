import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import AdminStatistics from './components/admin';
import GeneralReactions from './components/general';

const { TabPane } = Tabs;

const Reactions = () => {
  const profile = useSelector((state) => state.auth.profile);
  return (
    <>
      {!profile.is_admin ? (
        <GeneralReactions />
      ) : (
        <Tabs defaultActiveKey='1'>
          <TabPane tab='General statistics' key='1'>
            <GeneralReactions />
          </TabPane>
          <TabPane tab='Pro statistics' key='2'>
            <AdminStatistics />
          </TabPane>
        </Tabs>
      )}
    </>
  );
};

export default Reactions;
