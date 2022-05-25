import { useNavigate } from 'react-router-dom';
import EditBtn from './components/Button';

const EditButton = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/edit');
  };

  if (!id) {
    return <EditBtn handleClick={handleClick} />;
  }
};

export default EditButton;
