import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  selectAllProducts,
} from "../../app/reducers/allProductsSlice";
import { selectSearchState } from "../../app/reducers/searchSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// TODO: add form for admin to add a product

const AllProducts = () => {
  const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
  const isAdmin = sessionStorage.getItem("isAdmin");
  const [editMode, setEditMode] = useState(false);
  const [category, setCategory] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [addedName, setAddedName] = useState("");
  const [addedDescription, setAddedDescription] = useState("");
  const [addedPrice, setAddedPrice] = useState(0);
  const [addedImageUrl, setAddedImageUrl] = useState("");
  const [addedCategory, setAddedCategory] = useState("");
  const [toggleSubmitted, setToggleSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const search = useSelector(selectSearchState)[0];
  const filter = () => {

    const filtered = products.filter(
      (product) => product.category === category
    );
    setFiltered(filtered);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      addedName === "" ||
      addedDescription === "" ||
      addedPrice === 0 ||
      addedImageUrl === "" ||
      addedCategory === ""
    ) {
      setError(
        "Please fill out all fields and assure image URL is a valid URL"
      );
      return;
    }
    await axios.post("/api/products", {
      name: addedName,
      description: addedDescription,
      price: addedPrice,
      imageUrl: addedImageUrl,
      category: addedCategory,
    });
    setToggleSubmitted(!toggleSubmitted);
  };
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    console.log("toggleSubmitted: ", toggleSubmitted);
    console.log("useEffect Ran");
    filter();
  }, [updatedProducts, category, toggleSubmitted]);
  useEffect(() => {
    setError("");
  }, [addedName, addedDescription, addedPrice, addedImageUrl, addedCategory]);
  useEffect(() => {
    if (
      !sessionStorage.getItem("accessToken") &&
      !sessionStorage.getItem("guestId")
    ) {
      sessionStorage.setItem("guestId", uuidv4());
    }
  }, []);
  console.log("category: ", category);
  return (
    <div>
      {isAdmin &&
      // currUser.isAdmin
      editMode ? (
        <button
          className="btn btn-warning"
          type="button"
          onClick={(e) => setEditMode(!editMode)}
        >
          Toggle User Mode
        </button>
      ) : isAdmin ? (
        // currUser.isAdmin
        <button
          className="btn btn-warning"
          type="button"
          onClick={(e) => setEditMode(!editMode)}
        >
          Toggle Admin Mode
        </button>
      ) : null}
      {isAdmin &&
      // currUser.isAdmin
      editMode ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <h3>Add Product</h3>
            {error !== "" ? (
              <p style={{ backgroundColor: "red" }}>{error}</p>
            ) : null}
            <label htmlFor="name">Name</label>
            <input
              placeholder="Game name..."
              type="text"
              value={addedName}
              onChange={(e) => setAddedName(e.target.value)}
            />
            <label htmlFor="Description">Description</label>
            <input
              placeholder="Description..."
              type="text"
              value={addedDescription}
              onChange={(e) => setAddedDescription(e.target.value)}
            />
            <label htmlFor="Price">Price</label>
            <input
              placeholder="Price..."
              type="number"
              value={addedPrice}
              onChange={(e) => setAddedPrice(e.target.value)}
            />
            <label htmlFor="imageUrl">imageUrl</label>
            <input
              placeholder="ImageUrl..."
              type="url"
              value={addedImageUrl}
              onChange={(e) => setAddedImageUrl(e.target.value)}
            />
            <label>Category</label>
            <select onChange={(e) => setAddedCategory(e.target.value)}>
              <option value="">Select Category...</option>
              <option value="XBOX">Xbox</option>
              <option value="Nintendo">Nintendo</option>
              <option value="PS5">PS5</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
      ) : null}
      <h1>Products</h1>
      <select defaultValue="" onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="XBOX">Xbox</option>
        <option value="Nintendo">Nintendo</option>
        <option value="PS5">PS5</option>
      </select>
      {(filtered[0] && search !== "") || category !== ""
        ? filtered?.map((product) =>
            product.name.toLowerCase().includes(search) ||
            product.name.toUpperCase().includes(search) ? (
              <div>
                {isAdmin &&
                // currUser.isAdmin
                editMode ? (
                  <button
                    type="submit"
                    onClick={async (e) => {
                      e.preventDefault();
                      await axios
                        .delete(`/api/products/${product.id}`)
                        .then((res) => {
                          setUpdatedProducts(res.data);
                        });
                      console.log(updatedProducts);
                    }}
                  >
                    X
                  </button>
                ) : null}
                <h1>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h1>
                <img className="productImage" src={product.imageUrl} />
                <h3>{product.price}</h3>
                <h5>Category: {product.category}</h5>
                <p>{product.description}</p>
              </div>
            ) : null
          )
        : !filtered[0] && search !== "" && category === ""
        ? products?.map((product) =>
            product.name.toLowerCase().includes(search) ||
            product.name.toUpperCase().includes(search) ? (
              <div>
                {isAdmin &&
                // currUser.isAdmin
                editMode ? (
                  <button
                    type="submit"
                    onClick={async (e) => {
                      e.preventDefault();
                      await axios
                        .delete(`/api/products/${product.id}`)
                        .then((res) => {
                          setUpdatedProducts(res.data);
                        });
                      console.log(updatedProducts);
                    }}
                  >
                    X
                  </button>
                ) : null}
                <h1>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h1>
                <img className="productImage" src={product.imageUrl} />
                <h3>{product.price}</h3>
                <h5>Category: {product.category}</h5>
                <p>{product.description}</p>
              </div>
            ) : null
          )
        : (filtered[0] && search === "") || category !== ""
        ? filtered?.map((product) => (
            <div>
              {isAdmin && editMode ? (
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    await axios
                      .delete(`/api/products/${product.id}`)
                      .then((res) => {
                        setUpdatedProducts(res.data);
                      });
                    console.log(updatedProducts);
                  }}
                >
                  X
                </button>
              ) : null}
              <h1>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h1>
              <img className="productImage" src={product.imageUrl} />
              <h3>{product.price}</h3>
              <h5>Category: {product.category}</h5>
              <p>{product.description}</p>
            </div>
          ))
        : products.map((product) => (
            <div>
              {isAdmin && editMode ? (
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    await axios
                      .delete(`/api/products/${product.id}`)
                      .then((res) => {
                        setUpdatedProducts(res.data);
                      });
                    console.log(updatedProducts);
                  }}
                >
                  X
                </button>
              ) : null}
              <h1>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h1>
              <img className="productImage" src={product.imageUrl} />
              <h3>{product.price}</h3>
              <h5>Category: {product.category}</h5>
              <p>{product.description}</p>
            </div>
          ))}
    </div>
  );
};
=======
		<div>
			{isAdmin &&
			// currUser.isAdmin
			editMode ? (
				<button
					className="btn btn-warning"
					type="button"
					onClick={(e) => setEditMode(!editMode)}>
					Toggle User Mode
				</button>
			) : isAdmin ? (
				// currUser.isAdmin
				<button
					className="btn btn-warning"
					type="button"
					onClick={(e) => setEditMode(!editMode)}>
					Toggle Admin Mode
				</button>
			) : null}
			{isAdmin &&
			// currUser.isAdmin
			editMode ? (
				<div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}>
						<h3>Add Product</h3>
						{error !== "" ? (
							<p style={{ backgroundColor: "red" }}>{error}</p>
						) : null}
						<label htmlFor="name">Name</label>
						<input
							placeholder="Game name..."
							type="text"
							value={addedName}
							onChange={(e) => setAddedName(e.target.value)}
						/>
						<label htmlFor="Description">Description</label>
						<input
							placeholder="Description..."
							type="text"
							value={addedDescription}
							onChange={(e) => setAddedDescription(e.target.value)}
						/>
						<label htmlFor="Price">Price</label>
						<input
							placeholder="Price..."
							type="number"
							value={addedPrice}
							onChange={(e) => setAddedPrice(e.target.value)}
						/>
						<label htmlFor="imageUrl">imageUrl</label>
						<input
							placeholder="ImageUrl..."
							type="url"
							value={addedImageUrl}
							onChange={(e) => setAddedImageUrl(e.target.value)}
						/>
						<label>Category</label>
						<select onChange={(e) => setAddedCategory(e.target.value)}>
							<option value="">Select Category...</option>
							<option value="Xbox">Xbox</option>
							<option value="Nintendo">Nintendo</option>
							<option value="PlayStation">PlayStation</option>
							<option value="GameCube">GameCube</option>
							<option value="PC">PC</option>
							<option value="Wii">Wii</option>
							<option value="IOS">IOS</option>
							<option value="Mac">Mac</option>
						</select>
						<button type="submit">Add</button>
					</form>
				</div>
			) : null}
			<h1>Products</h1>
			<select defaultValue="" onChange={(e) => setCategory(e.target.value)}>
				<option value="">Select Category...</option>
				<option value="Xbox">Xbox</option>
				<option value="Nintendo">Nintendo</option>
				<option value="PlayStation">PlayStation</option>
				<option value="GameCube">GameCube</option>
				<option value="PC">PC</option>
				<option value="Wii">Wii</option>
				<option value="iOS">iOS</option>
				<option value="Mac">Mac</option>
			</select>
			{(filtered[0] && search !== "") || category !== ""
				? filtered?.map((product) =>
						product.name.toLowerCase().includes(search) ||
						product.name.toUpperCase().includes(search) ? (
							<div>
								{isAdmin &&
								// currUser.isAdmin
								editMode ? (
									<button
										type="submit"
										onClick={async (e) => {
											e.preventDefault();
											await axios
												.delete(`/api/products/${product.id}`)
												.then((res) => {
													setUpdatedProducts(res.data);
												});
											console.log(updatedProducts);
										}}>
										X
									</button>
								) : null}
								<h1>
									<Link to={`/products/${product.id}`}>{product.name}</Link>
								</h1>
								<img className="productImage" src={product.imageUrl} />
								<h3>{product.price}</h3>
								<h5>Category: {product.category}</h5>
								<p>{product.description}</p>
							</div>
						) : null
				  )
				: !filtered[0] && search !== "" && category === ""
				? products?.map((product) =>
						product.name.toLowerCase().includes(search) ||
						product.name.toUpperCase().includes(search) ? (
							<div>
								{isAdmin &&
								// currUser.isAdmin
								editMode ? (
									<button
										type="submit"
										onClick={async (e) => {
											e.preventDefault();
											await axios
												.delete(`/api/products/${product.id}`)
												.then((res) => {
													setUpdatedProducts(res.data);
												});
											console.log(updatedProducts);
										}}>
										X
									</button>
								) : null}
								<h1>
									<Link to={`/products/${product.id}`}>{product.name}</Link>
								</h1>
								<img className="productImage" src={product.imageUrl} />
								<h3>{product.price}</h3>
								<h5>Category: {product.category}</h5>
								<p>{product.description}</p>
							</div>
						) : null
				  )
				: (filtered[0] && search === "") || category !== ""
				? filtered?.map((product) => (
						<div>
							{isAdmin && editMode ? (
								<button
									type="submit"
									onClick={async (e) => {
										e.preventDefault();
										await axios
											.delete(`/api/products/${product.id}`)
											.then((res) => {
												setUpdatedProducts(res.data);
											});
										console.log(updatedProducts);
									}}>
									X
								</button>
							) : null}
							<h1>
								<Link to={`/products/${product.id}`}>{product.name}</Link>
							</h1>
							<img className="productImage" src={product.imageUrl} />
							<h3>{product.price}</h3>
							<h5>Category: {product.category}</h5>
							<p>{product.description}</p>
						</div>
				  ))
				: products.map((product) => (
						<div>
							{isAdmin && editMode ? (
								<button
									type="submit"
									onClick={async (e) => {
										e.preventDefault();
										await axios
											.delete(`/api/products/${product.id}`)
											.then((res) => {
												setUpdatedProducts(res.data);
											});
										console.log(updatedProducts);
									}}>
									X
								</button>
							) : null}
							<h1>
								<Link to={`/products/${product.id}`}>{product.name}</Link>
							</h1>
							<img className="productImage" src={product.imageUrl} />
							<h3>{product.price}</h3>
							<h5>Category: {product.category}</h5>
							<p>{product.description}</p>
						</div>
				  ))}
		</div>
	);
}
                  

export default AllProducts;
