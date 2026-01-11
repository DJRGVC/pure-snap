'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'product' | 'checkout'>('home');
  const [cartQty, setCartQty] = useState(0);
  const [currentQty, setCurrentQty] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const price = 5.99;

  const words = ['Innovators', 'Futurists', 'Creators', 'Founders'];

  // Typewriter effect
  React.useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterWord = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseAfterWord);
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  const navigate = (page: 'home' | 'product' | 'checkout') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const adjustQty = (delta: number) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      setCurrentQty(newQty);
    }
  };

  const addToCart = () => {
    setCartQty(cartQty + currentQty);
    setCurrentQty(1);
  };

  const processOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setShowSuccessModal(true);
      setCartQty(0);
    }, 1500);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate('home');
  };

  const checkoutQty = cartQty > 0 ? cartQty : 1;
  const checkoutTotal = (checkoutQty * price).toFixed(2);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('home')}>
          <Image
            src="/pure-snap-logo.png"
            alt="Pure Snap Logo"
            width={200}
            height={80}
            priority
            className={styles.logoImage}
          />
        </div>
        <div className={styles.navLinks}>
          <button onClick={() => navigate('home')}>Our Vision</button>
          <button onClick={() => navigate('product')}>Shop</button>
          <button onClick={() => navigate('checkout')} className={styles.cartIcon}>
            Cart
            <span className={styles.cartCount}>{cartQty}</span>
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        {currentPage === 'home' && (
          <section className={styles.homeSection}>
            <div className={styles.hero}>
              <h1>Pure Ingredients.<br />Professional Snap.</h1>
              <p>The high-density snack engineered for the high-output life. <br />8g Protein. Zero Seed Oils. 100% Satisfaction.</p>
              <button className={styles.ctaButton} onClick={() => navigate('product')}>Shop the Release</button>
            </div>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <h3>Clean Label Verification</h3>
                <p>We removed the dealbreakers. No coconut oil, no seed oils, no artificial sweeteners. Just Avocado Oil and Himalayan Pink Salt.</p>
              </div>
              <div className={styles.featureCard}>
                <h3>GLP-1 Optimized</h3>
                <p>Designed for nutrient density. When volume goes down, quality must go up. 8-10g of plant protein to protect lean muscle.</p>
              </div>
              <div className={styles.featureCard}>
                <h3>The "High-Low" Texture</h3>
                <p>A shattering salty crunch followed by a velvety chocolate melt. The end of chalky protein bars is here.</p>
              </div>
            </div>

            <div className={styles.foundersSection}>
              <h2>
                Meet the <span className={styles.typingText}>{typedText}</span>
                <span className={styles.cursor}>|</span>
              </h2>
              <p className={styles.foundersIntro}>
                Created by three passionate innovators committed to redefining high-performance snacking.
              </p>
              <div className={styles.foundersGrid}>
                <div className={styles.founderCard}>
                  <Image
                    src="/daniel.jpg"
                    alt="Daniel Grant"
                    width={80}
                    height={80}
                    className={styles.founderPhoto}
                  />
                  <h3>Daniel Grant</h3>
                  <p>Co-Founder</p>
                </div>
                <div className={styles.founderCard}>
                  <Image
                    src="/lleyton.jpeg"
                    alt="Lleyton Elliot"
                    width={80}
                    height={80}
                    className={styles.founderPhoto}
                  />
                  <h3>Lleyton Elliot</h3>
                  <p>Co-Founder</p>
                </div>
                <div className={styles.founderCard}>
                  <Image
                    src="/mohannad.jpeg"
                    alt="Mohannad ElAsad"
                    width={80}
                    height={80}
                    className={styles.founderPhoto}
                  />
                  <h3>Mohannad ElAsad</h3>
                  <p>Co-Founder</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'product' && (
          <section className={styles.productSection}>
            <div className={styles.productContainer}>
              <div className={styles.productImage}>
                <Image
                  src="/product.png"
                  alt="Pure Snap Product - Himalayan Pink Salt & Milk"
                  width={400}
                  height={500}
                  className={styles.productImageActual}
                  style={{ borderRadius: '20px' }}
                />
              </div>

              <div className={styles.productDetails}>
                <span className={styles.limitedBatch}>Limited Pilot Batch</span>
                <h1 className={styles.productTitle}>Pure Snap: Pink Salt & Milk</h1>
                <div className={styles.productPrice}>
                  $5.99 <span className={styles.priceUnit}>/ 3.5oz Pouch</span>
                </div>

                <p className={styles.productDescription}>
                  Flash-roasted fava bean cores seasoned with fine-grain Himalayan Pink Salt, encased in 45% grass-fed milk chocolate. Tempered for a professional snap.
                </p>

                <div className={styles.ingredientPills}>
                  <div className={styles.ingredientPill}>8g Protein</div>
                  <div className={styles.ingredientPill}>No Seed Oils</div>
                  <div className={styles.ingredientPill}>Grass-Fed Dairy</div>
                  <div className={styles.ingredientPill}>High Fiber</div>
                </div>

                <div className={styles.quantitySelector}>
                  <button className={styles.qtyBtn} onClick={() => adjustQty(-1)}>-</button>
                  <input type="text" className={styles.qtyInput} value={currentQty} readOnly />
                  <button className={styles.qtyBtn} onClick={() => adjustQty(1)}>+</button>
                </div>

                <button className={styles.ctaButton} onClick={addToCart}>Add to Cart</button>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'checkout' && (
          <section className={styles.checkoutSection}>
            <div className={styles.checkoutContainer}>
              <h2 className={styles.checkoutTitle}>Secure Checkout</h2>

              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>Pure Snap (x{checkoutQty})</span>
                  <span>${checkoutTotal}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping (Pilot Launch)</span>
                  <span>$0.00</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${checkoutTotal}</span>
                </div>
              </div>

              <form className={styles.checkoutForm} onSubmit={processOrder}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Email Address</label>
                  <input type="email" required placeholder="you@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input type="text" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input type="text" required />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Shipping Address</label>
                  <input type="text" required placeholder="123 Market St" />
                </div>
                <div className={styles.formGroup}>
                  <label>City</label>
                  <input type="text" required placeholder="San Francisco" />
                </div>
                <div className={styles.formGroup}>
                  <label>Zip Code</label>
                  <input type="text" required />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Card Details (Simulated)</label>
                  <input type="text" placeholder="0000 0000 0000 0000" disabled />
                </div>

                <button type="submit" className={`${styles.ctaButton} ${styles.fullWidth}`}>
                  Complete Order
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {showSuccessModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.checkmark}>✓</div>
            <h2 className={styles.modalTitle}>Order Confirmed</h2>
            <p>Welcome to the Pure Snap community. Your pilot batch is being prepared.</p>
            <button className={styles.ctaButton} onClick={closeModal}>Back to Home</button>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>&copy; 2026 Pure Snap. San Francisco, CA.</p>
        <p className={styles.footerTagline}>Made with clean ingredients. Professional Snap.</p>
      </footer>
    </>
  );
}
