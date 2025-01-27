import { FaRegSadTear } from 'react-icons/fa';
function PageNotFound() {
  return (
    <div className='text-center'>
      <FaRegSadTear  className='mt-5' style={{fontSize:"100px"}}/>
      <h1 className='HeadingStyle mb-5'>404 - Page Not Found</h1>
      <p className='DefaultFontColor mt-5'>Oops! The page you are looking for does not exist.</p>
      <button className='DefaultButton' onClick={() => window.location.href = '/'}>
        Go to Home
      </button>
    </div>
  );
}



export default PageNotFound;
