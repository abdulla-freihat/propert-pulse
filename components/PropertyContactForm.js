'use client'
import { useState } from 'react'
import {FaPaperPlane} from 'react-icons/fa'
import { toast } from 'react-toastify'

const PropertyContactForm = ({property}) => {


   const  [name , setName] = useState('')
   const  [email, setEmail] = useState('')
   const  [phoneNumber , setPhoneNumber] = useState('')
   const  [message , setMessage] = useState('')
   const  [wasSubmited , setWasSubmited] = useState(false)




   const handleSubmit = async(e)=>{
       e.preventDefault();

       const data={
         
         name,
         email,
         phoneNumber,
         message,
         recipient:property.owner,
         property: property._id

         
       }

     
       try{

        const res = await  fetch('/api/messages' ,{

           method :'POST',
           headers:{'content-type' : 'application/json'},
           body: JSON.stringify(data)
        })

        if(res.status === 200){


          toast.success('Message sent successfully')

          setWasSubmited(true)

        }else if(res.status === 400 || res.status === 401 ){

              const apiData = await res.json()
           toast.error(apiData.message)

        }else{

           toast.error('Eror sending form!')
        }

         
       }catch(err){

         
           toast.error(err.message)
       }



     
   }


  return (
    <div className="bg-white   dark:bg-gray-800 border p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>

               {wasSubmited ?(

                 <p className='mb-4 text-green-600 font-semibold'>Your message has been sent successfully.</p>

               ) : (


                <form onSubmit={handleSubmit}>

<div className='mb-4'>
  <label
    className='block text-gray-700 text-sm font-bold mb-2'
    htmlFor='name'
  >
    Name:
  </label>
  <input
    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    id='name'
    type='text'
    placeholder='Enter your name'             
    required
    value={name}
    onChange={(e)=>setName(e.target.value)}
  />
</div>
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="email"
    >
      Email:
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="email"
      type="email"
      placeholder="Enter your email"
      required
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
    />
  </div>
  <div className='mb-4'>
    <label
      className='block text-gray-700 text-sm font-bold mb-2'
      htmlFor='phone'
    >
      Phone:
    </label>
    <input
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      id='phone'
      type='text'
      placeholder='Enter your phone number'
      value={phoneNumber}
      onChange={(e)=>setPhoneNumber(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="message"
    >
      Message:
    </label>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
      id="message"
      placeholder="Enter your message"
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
    ></textarea>
  </div>
  <div>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
      type="submit"
    >
      <FaPaperPlane className=" mr-2" /> Send Message
    </button>
  </div>
</form>
                 
               )}
              
            </div>
  )
}

export default PropertyContactForm