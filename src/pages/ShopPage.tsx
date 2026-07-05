import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Search,
  X,
  Trash2,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  Heart,
  Eye,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";
import { useMerchandise } from "../hooks/useMerchandise";
import type { Merchandise } from "../lib/supabase";

type CartItem = Merchandise & {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

const categories = ["All", "Apparel", "Accessories", "Education"];

export function ShopPage() {
  const { items: products, loading } = useMerchandise();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Merchandise | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-sliding carousel for T-shirts
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const tshirtProduct = products.find((p) => p.is_tshirt);
  const otherProducts = products.filter((p) => !p.is_tshirt);

  const filteredProducts = useMemo(() => {
    return otherProducts.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.tags?.includes(activeCategory);
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [otherProducts, activeCategory, search]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: Merchandise, size?: string, color?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null);
    setSelectedColorIndex(0);
    setSelectedSize(undefined);
  };

  const removeFromCart = (id: string, size?: string, color?: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.id === id && i.selectedSize === size && i.selectedColor === color))
    );
  };

  const updateQuantity = (id: string, delta: number, size?: string, color?: string) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const openProductDetail = (product: Merchandise) => {
    setSelectedProduct(product);
    setSelectedColorIndex(0);
    setSelectedSize(product.sizes?.[0]);
  };

  const currentTshirtImage =
    tshirtProduct?.color_images
      ? Object.values(tshirtProduct.color_images)[carouselIndex % 5]
      : tshirtProduct?.cover_image;

  return (
    <div className="min-h-screen pb-24 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>

        {/* Premium Hero */}
        <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1209] via-[#2d1f0f] to-[#1a1209] p-12 lg:p-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(#C96A2B_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
          <div className="relative z-10">
            <div className="mx-auto mb-6 inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-[3px] text-white/80">EST 2021 • NAIROBI</div>
            <h1 className="font-display text-6xl font-bold text-white tracking-tight lg:text-7xl">WATALII Shop</h1>
            <p className="mx-auto mt-4 max-w-md text-lg text-white/70">Premium Kenyan merch for the culture.</p>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Truck, label: "Free Shipping", sub: "Orders over KES 5,000" },
            { icon: ShieldCheck, label: "Secure Payment", sub: "M-Pesa & Card" },
            { icon: RefreshCw, label: "Easy Returns", sub: "14-day policy" },
            { icon: Star, label: "Premium Quality", sub: "Locally made" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <div className="rounded-full bg-[#C96A2B]/10 p-3"><b.icon className="h-5 w-5 text-[#C96A2B]" /></div>
              <div>
                <div className="font-semibold text-black">{b.label}</div>
                <div className="text-xs text-black/60">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* T-SHIRT AUTO-SLIDING CAROUSEL */}
        {tshirtProduct && (
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs tracking-[2px] text-[#C96A2B] font-medium">SIGNATURE COLLECTION</div>
                <h3 className="font-display text-3xl font-bold text-black">Signature Tees</h3>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl cursor-pointer" onClick={() => openProductDetail(tshirtProduct)}>
              <div className="flex items-center justify-center py-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIndex}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group"
                  >
                    <img
                      src={currentTshirtImage}
                      alt="WATALII T-Shirt"
                      className="h-[420px] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black px-6 py-1 text-sm text-white font-medium">
                      {Object.keys(tshirtProduct.color_images || {})[carouselIndex % 5]}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={cn("h-1.5 rounded-full transition-all", carouselIndex === i ? "w-8 bg-[#C96A2B]" : "w-2 bg-black/20")} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-4 text-black/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-2xl border border-gray-200 py-4 pl-12 pr-4 text-black placeholder:text-black/40 focus:outline-none focus:border-[#C96A2B]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn("rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition", activeCategory === cat ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200")}
              >
                {cat}
              </button>
            ))}
          </div>
          <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 rounded-full bg-[#C96A2B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a8552a]">
            <ShoppingBag className="h-4 w-4" /> Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
          </button>
        </div>

        {/* Product Grid - Fetched from Database */}
        {loading ? (
          <div className="flex h-64 items-center justify-center"><div className="text-black/50">Loading products...</div></div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f8f4eb]">
                  <img
                    src={product.cover_image}
                    alt={product.title}
                    className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.compare_price && (
                    <div className="absolute left-4 top-4 rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold text-white">SALE</div>
                  )}
                  {/* Hover Icons - Eye & Heart */}
                  <div className="absolute right-5 top-5 flex flex-col gap-3 opacity-0 translate-x-3 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                    <Eye onClick={() => openProductDetail(product)} className="h-5 w-5 text-black/70 hover:text-black cursor-pointer drop-shadow" />
                    <Heart onClick={() => openProductDetail(product)} className="h-5 w-5 text-black/70 hover:text-[#C8102E] cursor-pointer drop-shadow" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-sm text-[#C96A2B]">
                    <Star className="h-4 w-4 fill-current" /> {product.rating} <span className="text-black/40">({product.reviews})</span>
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold text-black">{product.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-black/60">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="font-display text-2xl font-bold text-black">KES {product.price}</span>
                      {product.compare_price && <span className="ml-2 text-sm text-black/40 line-through">KES {product.compare_price}</span>}
                    </div>
                    <Button variant="primary" size="sm" onClick={() => openProductDetail(product)}>View</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white"
            >
              <button onClick={() => { setSelectedProduct(null); setSelectedColorIndex(0); }} className="absolute right-6 top-6 z-10 rounded-full bg-black/80 p-3 text-white"><X /></button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-[#f8f4eb] p-10 flex items-center justify-center">
                  <img
                    src={selectedProduct.is_tshirt && selectedProduct.color_images
                      ? Object.values(selectedProduct.color_images)[selectedColorIndex]
                      : selectedProduct.cover_image}
                    alt={selectedProduct.title}
                    className="max-h-[480px] w-auto object-contain"
                  />
                </div>

                <div className="p-10">
                  <div className="text-xs tracking-[3px] text-[#C96A2B] font-medium">WATALII • PREMIUM</div>
                  <h2 className="font-display text-4xl font-bold text-black mt-1">{selectedProduct.title}</h2>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex text-[#C96A2B]">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                    <span className="text-sm text-black/60">{selectedProduct.rating} • {selectedProduct.reviews} reviews</span>
                  </div>

                  <div className="mt-6 text-4xl font-display font-bold text-black">KES {selectedProduct.price}</div>
                  {selectedProduct.compare_price && <div className="text-sm text-black/40 line-through">KES {selectedProduct.compare_price}</div>}

                  <p className="mt-6 text-black/70 leading-relaxed">{selectedProduct.description}</p>

                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div className="mt-8">
                      <div className="text-sm font-semibold mb-3 text-black">Color</div>
                      <div className="flex gap-3">
                        {selectedProduct.colors.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedColorIndex(idx)}
                            className={cn("h-10 w-10 rounded-full border-2 transition-all", selectedColorIndex === idx ? "border-black scale-110" : "border-gray-200")}
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                      <div className="mt-1.5 text-sm text-black/60">{selectedProduct.colors[selectedColorIndex]?.name}</div>
                    </div>
                  )}

                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="mt-8">
                      <div className="text-sm font-semibold mb-3 text-black">Size</div>
                      <div className="flex gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn("rounded-xl border px-6 py-2 text-sm font-medium transition", selectedSize === size ? "bg-black text-white border-black" : "border-gray-200 hover:bg-gray-50")}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className="mt-10 w-full py-6 text-lg"
                    variant="primary"
                    onClick={() => addToCart(selectedProduct, selectedSize, selectedProduct.colors?.[selectedColorIndex]?.name)}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart — KES {selectedProduct.price}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <div className="fixed inset-0 z-[210] bg-black/60" onClick={() => setIsCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 z-[220] h-full w-full max-w-md bg-white p-8 shadow-2xl overflow-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="font-display text-3xl font-bold text-black">Your Cart</div>
                <button onClick={() => setIsCartOpen(false)}><X /></button>
              </div>

              {cart.length === 0 ? (
                <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-black/20" />
                  <p className="mt-4 text-black/60">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 border-b pb-4">
                        <img src={item.cover_image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                        <div className="flex-1 text-sm">
                          <div className="font-semibold text-black">{item.title}</div>
                          <div className="text-black/50 text-xs mt-0.5">{item.selectedColor} {item.selectedSize && `• ${item.selectedSize}`}</div>
                          <div className="mt-1 font-bold text-black">KES {item.price}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.id, -1, item.selectedSize, item.selectedColor)} className="rounded border px-2">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1, item.selectedSize, item.selectedColor)} className="rounded border px-2">+</button>
                            <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="ml-auto text-red-500"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 border-t">
                    <div className="flex justify-between font-bold text-lg mb-6"><span>Total</span><span>KES {cartTotal}</span></div>
                    <Button className="w-full py-6 text-lg" variant="primary"><CreditCard className="mr-2" /> Checkout with M-Pesa</Button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
