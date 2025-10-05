import "../assets/styles/App.css";
import title from "../assets/img/BEJAMAS_ico.jpg";
import cart_close from "../assets/img/cart_ico.jpg";
import productsData from "../assets/data/data.json";
import hero_img from "../assets/img/hero_img.jpg";

import sugg_1 from "../assets/img/door_mob.png";
import sugg_2 from "../assets/img/window_mob.png";
import sugg_3 from "../assets/img/egg_mob.png";

import filMob from "../assets/img/filter_ico.png";
import closeMob from "../assets/img/close_ico_mob.png";
import { useState, useEffect } from "react";

function Home() {
  //Products
  const [products] = useState(productsData);
  const [filProducts, setFilProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  //pages
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  //Mobile checker state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1239);

  //Categories and Prices
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1239);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!isMobile) {
      applyFilters();
    }
  }, [selectedCategories, selectedPrices, isMobile]);

  console.log(filProducts.length);

  const totalPages = Math.ceil(filProducts.length / itemsPerPage);

  const startAt = (currentPage - 1) * itemsPerPage;
  const endAt = startAt + itemsPerPage;

  const currentItems = filProducts.slice(startAt, endAt);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination_btn ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  const addToCart = (product) => {
    setCart((prev) => {
      return [...prev, product];
    });
  };
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setSelectedPrices((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };
  const applyFilters = () => {
    const filtered = products.filter((product) => {
      let catMatch = true;
      let priceMatch = true;

      // ✅ Category matching
      if (selectedCategories.length > 0) {
        if (selectedCategories.includes("premium")) {
          if (!product.bestseller) return false;
        }
        if (
          !selectedCategories.includes(product.category.toLowerCase()) &&
          !selectedCategories.includes("premium")
        ) {
          return false;
        }
      }

      // ✅ Price matching
      if (selectedPrices.length > 0) {
        priceMatch = selectedPrices.some((range) => {
          const price = product.price;
          if (range === "<20") return price < 20;
          if (range === "20-100") return price >= 20 && price <= 100;
          if (range === "100-200") return price > 100 && price <= 200;
          if (range === ">200") return price > 200;
        });
      }

      return catMatch && priceMatch;
    });

    setFilProducts(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="bejamas-home_container">
      <header>
        <div className="title">
          <img src={title} alt="" />
        </div>
        <div className="cart">
          <div className="cart-ico">
            <img
              src={cart_close}
              alt=""
              onClick={() => {
                setShowCart((prev) => {
                  return !prev;
                });
              }}
            />
          </div>

          <div className={`cart-container ${showCart ? `active` : ""}`}>
            <div
              className="ico"
              onClick={() => {
                setShowCart((prev) => {
                  return !prev;
                });
              }}
            >
              x
            </div>
            <div className="cart_tray">
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <div className="tray-item" key={item.id}>
                    <div className="info">
                      <p className="title">{item.name}</p>
                      <p className="txt">$ {item.price}</p>
                    </div>
                    <div className="img">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in cart</p>
              )}
            </div>
            <div
              className="cart_btn"
              onClick={() => {
                setCart([]);
              }}
            >
              CLEAR
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero_img">
            <div className="controls">
              <p className="controls_txt">Samurai King Resting</p>

              <button className="controls_btn">ADD TO CART</button>
            </div>
            <div className="image">
              <div className="image_txt">Photo of the day</div>
              <div className="image_content">
                <img src={hero_img} alt="samurai king" className="mob" />
                <img src={hero_img} alt="samurai king" className="desktop" />
              </div>
            </div>
          </div>
          <div className="hero_info">
            <div className="hero_info_txt">
              <h1 className="txt_title">About the Samurai King Resting</h1>
              <p className="txt_sub">
                So how did the classNameical Latin become so incoherent?
                According to McClintock, a 15th century typesetter likely
                scrambled part of Cicero's De Finibus in order to provide
                placeholder text to mockup various fonts for a type specimen
                book.So how did the classNameical Latin become so incoherent?{" "}
                <br />
                According to McClintock, a 15th century typesetter likely
                scrambled part of Cicero's De Finibus in order to provide
                placeholder text to mockup various fonts for a type specimen
                book.So how did the classNameical Latin become so incoherent?
                According to McClintock.
              </p>
            </div>
            <div className="hero_info_suggestions">
              <h1 className="suggestions_title">People also buy</h1>
              <div className="suggestions_cards">
                <div className="card">
                  <img src={sugg_1} alt="" />
                </div>
                <div className="card">
                  <img src={sugg_2} alt="" />
                </div>
                <div className="card">
                  <img src={sugg_3} alt="" />
                </div>
              </div>
            </div>
            <div className="hero_info_details">
              <div className="details_title">Details</div>
              <p>Size : 1020 x 1020 pixel</p>
              <p>Size : 15 mb</p>
            </div>
          </div>
        </section>
        <section className="photos">
          <div className="photos_title">
            <p>
              Photographs / <span>Premium photos</span>
            </p>

            <div className="ico" id="mob">
              <img src={filMob} alt="" />
            </div>
            <div className="ico" id="desktop"></div>
          </div>

          <div className="container">
            <div className="photos_filters">
              <div className="filters_content">
                <div className="content_title">
                  <p>Filter</p>

                  <div className="ico">
                    <img src={closeMob} alt="close filters" />
                  </div>
                </div>
                <div className="content_filter-list">
                  <div className="list_cat">
                    <div className="cat_title">
                      <p>Category</p>
                    </div>
                    <div className="cat">
                      <input
                        type="checkbox"
                        name="people"
                        id="people"
                        className="check"
                        value="people"
                      />
                      <p>People</p>
                    </div>
                    <div className="cat">
                      <input
                        type="checkbox"
                        name="premium"
                        id="premium"
                        className="check"
                        value="premium"
                      />
                      <p>Premium</p>
                    </div>
                    <div className="cat">
                      <input
                        type="checkbox"
                        name="pets"
                        id="pets"
                        className="check"
                        value="pets"
                      />
                      <p>Pets</p>
                    </div>
                    <div className="cat">
                      <input
                        type="checkbox"
                        name="food"
                        id="food"
                        className="check"
                        value="food"
                      />
                      <p>Food</p>
                    </div>
                    <div className="cat">
                      <input
                        type="checkbox"
                        name="landmarks"
                        id="landmarks"
                        className="check"
                        value="landmarks"
                      />
                      <p>Landmarks</p>
                    </div>
                    <div className="cat">
                      <input
                        type="checkbox"
                        name="cities"
                        id="cities"
                        className="check"
                        value="cities"
                      />
                      <p>Cities</p>
                    </div>
                    <div className="cat">
                      <input
                        type="checkbox"
                        name="nature"
                        id="nature"
                        className="check"
                        value="nature"
                      />
                      <p>Nature</p>
                    </div>
                  </div>
                  <div className="list_prices">
                    <div className="prices_title">
                      <p>Price Range</p>
                    </div>
                    <div className="price">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="check"
                        value="<20"
                      />
                      <p>Lower than $20</p>
                    </div>
                    <div className="price">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="check"
                        value="20-100"
                      />
                      <p>$20 - $100</p>
                    </div>
                    <div className="price">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="check"
                        value="100-200"
                      />
                      <p>$100 - $200</p>
                    </div>
                    <div className="price">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="check"
                        value=">200"
                      />
                      <p>More than $200</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filters_btns">
                <div className="btns">
                  <button
                    className="btns_btn"
                    id="clear"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedPrices([]);
                      setFilProducts([]);
                      setCurrentPage(1);
                    }}
                  >
                    CLEAR
                  </button>
                  <button
                    className="btns_btn"
                    id="save"
                    onClick={() => {
                      applyFilters();
                    }}
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
            <div className="photos_grid">
              <div className="grid">
                {currentItems.map((product) => (
                  <div className="card" key={product.id}>
                    <div className="preview">
                      <img src={product.image} alt={product.name} />
                      <div
                        className="card-cart_btn"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </div>
                      {product.bestseller && (
                        <div className="desc">Best seller</div>
                      )}
                    </div>
                    <div className="txt">
                      <p className="txt_category">{product.category}</p>
                      <p className="txt_name">{product.name}</p>
                      <p className="txt_price">$ {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button
                  className="arrow"
                  id="page_prev"
                  aria-label="Previous page"
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                >
                  ‹
                </button>
                {renderPaginationButtons()}
                <button
                  className="arrow"
                  id="page_next"
                  aria-label="Next page"
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage((prev) => prev + 1);
                    }
                  }}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
