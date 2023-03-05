import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  fetchSingleProductAsync, selectProduct } from '../../app/reducers/singleProductSlice';
import { editSingleProductAsync } from '../../app/reducers/singleProductSlice';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

const EditProduct = (props) => {
  const { name, description, price, category, imageUrl } = props
    const [error, setError] = useState('');
    // const [name, setName] = useState('');
    // const [de] = useState('');
    // const [error, setError] = useState('');
    // const [error, setError] = useState('');
    // const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [form, setForm] = useState({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: '',
    });
    
    const { productId }= useParams();
    const changeValue = (key) => (event) => {
      setForm({
        ...form,
        [key]:event.target.value
      })
      if (key === 'category') {
        setForm(event.target.value);
      }
    }
    const singleProduct = useSelector(selectProduct);
    
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('form', form);
        dispatch(editSingleProductAsync({
            name: form.name1,
            description: form.description,
            price: form.price,
            imageUrl: form.imageUrl,
            category: form.category,
            productId: productId
        }))
        // props.getProduct(productId);
    }

    const edit = async (e) => {
      e.preventDefault();
      await axios.put('/api/products', {
        name,
        description,
        price,
        imageUrl,
        category,
        productId
      })
    }

    // useEffect(() => {
    //     // dispatch(fetchSingleProductAsync());
    // }, [])
    
    return (
			<div>
				<h1>Edit Product</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						edit(e);
						handleSubmit(e);
					}}>
					<label htmlFor="name">Name</label>
					<input
						placeholder="Game name..."
						type="text"
						value={form.name}
						onChange={changeValue("name")}
					/>
					<label htmlFor="Description">Description</label>
					<input
						placeholder="Description..."
						type="text"
						value={form.description}
						onChange={changeValue("description")}
					/>
					<label htmlFor="Price">Price</label>
					<p style={{ fontSize: "small", backgroundColor: "red" }}>{error}</p>
					<input
						placeholder="Price..."
						type="number"
						value={form.price}
						onChange={changeValue("price")}
					/>
					{
						// (event) => {
						//     return limitInput = () => {
						//         const array = event.target.value.split('');
						//         array = array.reverse();
						//         if(array[2] !== '.'){
						//             setError('Cannot input a fraction of a Cent. Will not update accordingly.');
						//         } else {
						//             changeValue('price')
						//         }
						//     }
						// }} />
					}
					<label htmlFor="imageUrl">imageUrl</label>
					<input
						placeholder="ImageUrl..."
						type="text"
						value={form.imageUrl}
						onChange={changeValue("imageUrl")}
					/>
					<label htmlFor="Category">Category</label>
					<div className="categoryButtons">
						<label>XBOX</label>
						<input
							type="radio"
							value={"XBOX"}
							onChange={changeValue("category")}
						/>
						<label>Nintendo</label>
						<input
							type="radio"
							value={"Nintendo"}
							onChange={changeValue("category")}
						/>
						<label>PS5</label>
						<input
							type="radio"
							value={"PS5"}
							onChange={changeValue("category")}
						/>
					</div>
					<button className="submitEditButton" type="submit">
						Submit
					</button>
				</form>
			</div>
		);
}

export default EditProduct;
