import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Badge, Image, List, Modal } from 'antd';

const ModalArea = ({ visibleModal, setVisibleModal, images, username }) => {
  const { id } = useParams();

  const [newImages, setNewImages] = useState(images);

  const handleDelete = (image) => {
    const newAlbum = [...newImages];

    newAlbum.splice(image, 1);

    setNewImages(newAlbum);
  };

  return (
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
        dataSource={newImages}
        locale={{ emptyText: () => null }}
        renderItem={(image) => (
          <List.Item key={image}>
            {!id ? (
              <>
                <span onClick={() => handleDelete(image)}>x</span>
                <Badge.Ribbon text='Delete' color='silver'>
                  <Image width={228} padding={20} src={image} />
                </Badge.Ribbon>
              </>
            ) : (
              <Image width={228} padding={20} src={image} />
            )}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ModalArea;
