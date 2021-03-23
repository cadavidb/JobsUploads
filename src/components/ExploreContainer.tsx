import './ExploreContainer.css';
import { Dev } from './upload/developer/Dev';
import { FormUpload } from './upload/FormUpload';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  


  return (
    (name==="info"?<Dev/>:<FormUpload/>)
  );
};

export default ExploreContainer;
