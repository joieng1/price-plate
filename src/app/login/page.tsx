import Link from 'next/link';
const loginPage = () => {
    return (
      <>
        {/* loginPage */}
         
      {/* <div style={{ backgroundColor: '#FFFCF4' }} className="flex items-center justify-center h-screen">
        <div style={{ backgroundColor: '#9DB4AB' }}className="bg-white p-8 rounded shadow-md">
        <p className="text-gray-700">Username</p>
      </div>
      </div> */}
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#FFFCF4' }}>

      <div className="flex flex-col items-center">
        <div style={{ 
          backgroundColor: '#9DB4AB', 
          position: 'relative', 
          zIndex: 1, width: 400 }} 
          className="p-4 rounded shadow-md mb-4">

          <label htmlFor="username"
           className="text-black">Username</label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-black"    
          />
        </div>

        <div style={{ 
          backgroundColor: '#9DB4AB', 
          position: 'relative', 
          zIndex: 1, width: 400}} 
          className="p-4 rounded shadow-md mb-4">

        <label htmlFor="password" className="text-black">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-black"
          />
        </div>
        <a href="signup" className="text-blue-500 mt-2 inline-block">New to PricePlate? Click here to create an account</a>
        <Link href="/home">
        <button style={{ 
          backgroundColor: '#283D3B', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px',
          borderRadius: '4px', 
          cursor: 'pointer', 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '20px' ,
          alignItems: 'center' }} 

          className="rounded shadow-md mb-4">
            
          Login
        </button>
        </Link>

      </div> 

    </div>
    
        
      </>
    );
  };

 export default loginPage;

