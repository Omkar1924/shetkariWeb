import axios from 'axios';
import React , {useEffect, useState}from 'react'
import { FiArrowRight } from "react-icons/fi";
import styled from "styled-components";

async function getData(setter) {
  
  const res = await axios.get("http://localhost:3001/getmenu");
  setter(res.data.menu || []);
}

const Item = ({name,price,image}) => {

  return (
    
      <div className="fooditem">
<span>{name}</span>
<span>{price}</span>
<span placeholder='image link'>{image}
</span>
</div>
    
  )
}

const Amenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image:""
  });

  const [err,setErr]= useState("");

  useEffect(() => {
    getData(setMenuItems)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("Registring...");
    try {
      const response = await fetch("http://localhost:3001/addMenuItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Registration successful
        // You can handle success as per your requirement (e.g., show a success message, redirect to login page, etc.)
        console.log("Registration successful");
        setErr("Registration successfull")
      } else {
        // Registration failed
        // You can handle failure as per your requirement (e.g., show an error message)
        console.error("Registration failed");
        setErr("Registration failed")
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErr("Something went wrong")

    }
    console.log(formData)
  };

  return (
    <Wrapper>
      <h2>Menu</h2>
      
      <form
              id="form"
              className="flex flex-col"
              // onSubmit={handleSubmit(onSubmit)}
              onSubmit={handleSubmit}
            >
<input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Item name"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Item price"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="Enter image link"
            />
<div className="login-error">
            {err}
            </div>

              <button type="submit" className="btn">
                Add <FiArrowRight />
              </button>
            </form>

            <div className='show-items'>
              <span>Name</span>
              <span>Price</span>
              <span>Image</span>

              {menuItems.map((item, index) => {
                return <Item key={index} {...item} />
              })
              }

            </div>


         </Wrapper>
  )
}


const Wrapper = styled.section`

.show-items{
  display:flex;
  flex-direction:row;
  justify-content:space-between;
}
.login-error{
  color:red;
  text-align:center;
  font-size:15px
}

  .register {
    max-width: 80rem;
    margin: 6rem auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #e9ecef;
    border-radius: 1rem;
    background-color: white;
    box-shadow: rgb(136, 136, 136) 0px 0px 5px 0px;
  }

  .register span {
    text-align: center;
    color: rgb(173, 181, 189);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.6rem 0 5rem;
    font-size: 1.4rem;
  }

  #form {
    max-width: 320px;
    width: 100vw;
    margin: 0 auto;
    padding: 0 2rem;
  }

  #form > input,
  .btn {
    border: 1px solid #e9ecef;
    padding: 0.9em 1em;
  }

  #form > input:focus {
    outline: none;
  }

  #form > .btn {
    margin: 2rem 0;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.2rem;
    outline: none;
    border: none;
    text-transform: uppercase;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    &:hover {
      background-color: ${({ theme }) => theme.colors.white};
      border: 1px solid ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.bg};
    }
  }

  #form > input {
    color: ${({ theme }) => theme.colors.black};
    padding: 1.2rem 2rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: uppercase;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    border-radius: 0.5rem;
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.black};
    }
  }
  .flex {
    display: flex;
    gap: 1em;
  }
  .flex-col {
    flex-direction: column;
  }
  .register .col-1 {
    margin: auto;
    padding: 3rem 0;
    h2 {
      font-size: 3rem;
    }
    .login-account {
      color: ${({ theme }) => theme.colors.black};
      font-size: 1.5rem;
      text-align: center;
      .login-btn {
        border: none;
        outline: none;
        background: transparent;
        color: ${({ theme }) => theme.colors.bg};
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        padding-left: 0.6rem;
      }
    }
  }
  .register .col-2 img {
    width: 35rem;
    height: 100%;
    object-fit: cover;
    align-self: flex-end;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    display: none;
  }
  form > p {
    color: darkred;
    opacity: 0.7;
    font-size: 1.4rem;
    line-height: 1.5;
    margin: 0rem 0 1rem;
    font-weight: 400;
  }
  @media only screen and (min-width: ${({ theme }) => theme.media.tab}) {
    .register {
      flex-direction: row;
      margin: 8rem auto;
    }
    .register .col-2 img {
      width: 35rem;
      height: 100%;
      object-fit: cover;
      align-self: flex-end;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      display: block;
    }
    .register .col-1 {
      h2 {
        font-size: 4rem;
      }
    }
    #form {
      padding: 0rem;
    }
    #form > input {
      padding: 1.6rem 2.4rem;
    }
  }
`;
export default Amenu
