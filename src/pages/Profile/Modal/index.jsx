import { Image, List, Modal } from 'antd';
import React from 'react';

const ModalArea = ({ visibleModal, setVisibleModal, images, username }) => {
  return (
    <>
      <Modal
        title={`${username}'s Photo Album`}
        centered
        visible={visibleModal}
        footer={null}
        onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)}
        width={1000}
      >
        <List
          grid={{
            gutter: 8,
            xs: 1,
          }}
          itemLayout='horizontal'
          dataSource={images}
          locale={{ emptyText: () => null }}
          renderItem={(image) => (
            <List.Item key={image}>
              <Image width={228} padding={20} src={image} />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ModalArea;
