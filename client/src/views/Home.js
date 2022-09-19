import Members from '../components/Members';
import Board from '../components/Board';
import Footer from '../components/Footer';

const Home = (props) => {

  // Lifting tasks state / status from Board to pass down to Form
  const { buttonState, setButtonState } = props;
  
  return (
    <div className="container">
      <Members />
      <Board buttonState={ buttonState } setButtonState={ setButtonState } />
      <Footer />
    </div>
  );
};

export default Home;