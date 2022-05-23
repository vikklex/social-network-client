import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const EditButton = ({ id }) => {
  const navigate = useNavigate();

  if (!id) {
    return (
      <Button
        type='primary'
        onClick={() => navigate('/edit')}
        className='edit__button'
      >
        Edit profile
      </Button>
    );
  }
};

export default EditButton;
