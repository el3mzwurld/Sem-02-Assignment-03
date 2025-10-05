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
  const [filProducts, setFilProducts] = useState(productsData);
  const [cart, setCart] = useState([]);

  //pages
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  //Mobile checker state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);

  //Categories and Prices
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  //mobile event states
  const [showCart, setShowCart] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!isMobile) {
      applyFilters();
    }
  }, [selectedCategories, selectedPrices, isMobile]);

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
    const value = e.target.value.toLowerCase();
    setSelectedCategories((prev) => {
      return prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value];
    });
  };
  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => {
      return !prev;
    });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedPrices((prev) => {
      return prev.includes(value)
        ? prev.filter((p) => p !== value)
        : [...prev, value];
    });
  };
  const applyFilters = () => {
    if (selectedCategories.length === 0 && selectedPrices.length === 0) {
      setFilProducts(productsData);
      setCurrentPage(1);
      return;
    }

    const filtered = productsData.filter((product) => {
      const cat = product.category.toLowerCase();
      const price = product.price;

      if (selectedCategories.length > 0) {
        //Premium = bestseller
        const wantsPremium = selectedCategories.includes("premium");
        const matchesCategory = selectedCategories.includes(cat);
        const matchesPremium = wantsPremium && product.bestseller;

        if (!(matchesCategory || matchesPremium)) return false;
      }
      if (selectedPrices.length > 0) {
        const matchesPrice = selectedPrices.some((range) => {
          if (range === "<20") return price < 20;
          if (range === "20-100") return price >= 20 && price <= 100;
          if (range === "100-200") return price > 100 && price <= 200;
          if (range === ">200") return price > 200;
          return false;
        });
        if (!matchesPrice) return false;
      }

      return true;
    });

    console.log(filtered);
    setFilProducts(filtered);
    setCurrentPage(1);
  };
  const handleSave = () => {
    applyFilters();
    setIsFilterOpen((prev) => {
      return !prev;
    });
  };
  const handleClr = () => {
    setFilProducts(productsData);
    setSelectedCategories([]);
    setSelectedPrices([]);
    setCurrentPage(1);
    setIsFilterOpen((prev) => {
      return !prev;
    });
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

            <div className="ico" id="mob" onClick={handleFilterToggle}>
              <img src={filMob} alt="" />
            </div>
            <div className="ico" id="desktop"></div>
          </div>

          <div className="container">
            <div className={`photos_filters ${isFilterOpen ? "active" : ""}`}>
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
                    {[
                      "people",
                      "premium",
                      "pets",
                      "food",
                      "landmarks",
                      "cities",
                      "nature",
                    ].map((cat) => (
                      <div className="cat" key={cat}>
                        <input
                          type="checkbox"
                          className="check"
                          value={cat}
                          checked={selectedCategories.includes(cat)}
                          onChange={handleCategoryChange}
                        />
                        <p>{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="list_prices">
                    <div className="prices_title">
                      <p>Price Range</p>
                    </div>
                    {[
                      { label: "Lower than $20", value: "<20" },
                      { label: "$20 - $100", value: "20-100" },
                      { label: "$100 - $200", value: "100-200" },
                      { label: "More than $200", value: ">200" },
                    ].map((range) => (
                      <div className="price" key={range.value}>
                        <input
                          type="checkbox"
                          className="check"
                          value={range.value}
                          checked={selectedPrices.includes(range.value)}
                          onChange={handlePriceChange}
                        />
                        <p>{range.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filters_btns">
                <div className="btns">
                  <button className="btns_btn" id="clear" onClick={handleClr}>
                    CLEAR
                  </button>
                  <button className="btns_btn" id="save" onClick={handleSave}>
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
                      <p className="txt_category">
                        {product.category[0].toUpperCase() +
                          product.category.slice(1)}
                      </p>
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
