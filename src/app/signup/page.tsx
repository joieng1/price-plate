import Link from 'next/link';

const signUpPage = () => {
    return (
        <>

        <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#FFFCF4' }}>
  
        <div className="flex flex-col items-center">
          <div style={{ 
            backgroundColor: '#9DB4AB', 
            position: 'relative', 
            zIndex: 1, width: 400 }} 
            className="p-4 rounded shadow-md mb-4">
  
            <label htmlFor="firstname"
             className="text-black">First Name</label>
            <input
              type="text"
              id="firstname"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-black"    
            />
          </div>

          
          <div style={{ 
            backgroundColor: '#9DB4AB', 
            position: 'relative', 
            zIndex: 1, width: 400 }} 
            className="p-4 rounded shadow-md mb-4">
  
            <label htmlFor="lastname"
             className="text-black">Last Name</label>
            <input
              type="text"
              id="Last name"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-black"    
            />
          </div>

          <div style={{ 
            backgroundColor: '#9DB4AB', 
            position: 'relative', 
            zIndex: 1, width: 400 }} 
            className="p-4 rounded shadow-md mb-4">
  
            <label htmlFor="email"
             className="text-black">Email</label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-black"    
            />
          </div>

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
          <a href="login" className="text-blue-500 mt-2 inline-block">Already have an account? Click here to log in</a>
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
              
            Sign up
          </button>
          </Link>
  
        </div> 
  
      </div>
      
          
        </>
      );
    };
  
  

  export default signUpPage;