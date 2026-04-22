import React from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const feedbacks = [
  {
    id: 1,
    name: "Ahmed Ben Salem",
    role: "Owner, The Fade Shop",
    location: "Sousse",
    content: "Since moving my barbershop to BookiSmart, I've seen a 40% decrease in no-shows. The auto-reminders are a game changer for my staff.",
    avatar: "👨‍💼",
    rating: 5,
    color: "from-rose-500 to-pink-500",
    accent: "rose",
  },
  {
    id: 2,
    name: "Selima Dridi",
    role: "Studio Director",
    location: "Tunis, Lac 2",
    content: "My clients love that they don't need an account. They just pick a time and book. It's the fastest system I've used in Tunisia.",
    avatar: "👩‍🎨",
    rating: 5,
    color: "from-violet-500 to-purple-500",
    accent: "violet",
  },
  {
    id: 3,
    name: "Dr. Mourad K.",
    role: "Orthodontist",
    location: "Sfax",
    content: "The 'Smart Waiting List' is incredible. When a patient cancels, the spot is filled within minutes. Zero wasted time in my clinic.",
    avatar: "👨‍⚕️",
    rating: 5,
    color: "from-emerald-500 to-teal-500",
    accent: "emerald",
  },
];

const FloatingOrb = ({ className }) => (
  <motion.div
    className={`absolute rounded-full blur-[100px] ${className}`}
    animate={{
      x: [0, 60, 0],
      y: [0, 40, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const TiltCard = ({ children, feedback, onClick }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (mouseY / (rect.height / 2)) * -8;
    const rotateY = (mouseX / (rect.width / 2)) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1500 }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 300, damping: 20 },
        rotateY: { type: "spring", stiffness: 300, damping: 20 },
        scale: { duration: 0.2 },
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[2.5rem]"
        style={{
          background: `linear-gradient(135deg, ${feedback.color.replace('from-', '').replace(' to-', ', ')})`,
          opacity: isHovered ? 0.08 : 0,
          filter: "blur(20px)",
        }}
      />
      {children}
    </motion.div>
  );
};

const FeedbackModal = ({ feedback, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50"
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            style={{ perspective: 2000 }}
          >
            <motion.div
              className="pointer-events-auto w-full max-w-lg mx-4"
              initial={{ rotateX: 90, opacity: 0, scale: 0.8, y: 80 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1, y: 0 }}
              exit={{ rotateX: -90, opacity: 0, scale: 0.8, y: -80 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.01 }}
              >
                <div className={`h-2 bg-gradient-to-r ${feedback.color}`} />
                <div className="p-8">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500"
                  >
                    ✕
                  </motion.button>

                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-2xl"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>

                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-700 text-lg font-medium leading-relaxed italic"
                  >
                    "{feedback.content}"
                  </motion.blockquote>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${feedback.color} flex items-center justify-center text-3xl shadow-lg`}
                      >
                        {feedback.avatar}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg">{feedback.name}</h4>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                          {feedback.role}
                        </p>
                        <p className="text-xs font-bold text-slate-400">
                          {feedback.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative">
      <div className="absolute inset-0">
        <FloatingOrb className="top-[-10%] left-[10%] w-[400px] h-[400px] bg-indigo-600/10" />
        <FloatingOrb className="bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-cyan-500/10" />
        <FloatingOrb className="top-[30%] left-[-5%] w-[200px] h-[200px] bg-rose-500/10" />
      </div>

      <div ref={heroRef} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em]">
            Community
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 tracking-tighter">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Professionals.
            </span>
          </h2>
          <p className="text-slate-500 font-medium mt-4">
            Hear from the business owners who scaled their projects with BookiSmart.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbacks.map((f, i) => {
            const cardRef = useRef(null);
            const isInView = useInView(cardRef, { once: true, margin: "-50px" });

            return (
              <TiltCard key={f.id} feedback={f} onClick={() => setSelectedFeedback(f)}>
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(f.rating)].map((_, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-amber-400"
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      &ldquo;{f.content}&rdquo;
                    </p>
                  </div>

                  <motion.div
                    className="mt-8 flex items-center gap-4"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl shadow-inner">
                      {f.avatar}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm leading-tight">
                        {f.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {f.role} &bull; {f.location}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-slate-200 flex flex-wrap justify-center gap-8 md:gap-20"
        >
          {["RELIABLE", "SECURE", "SMART", "FAST"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ delay: i * 0.1 }}
              className="font-black text-2xl text-slate-400 tracking-tighter italic hover:tracking-wider transition-all cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <FeedbackModal
        feedback={selectedFeedback}
        isOpen={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />
    </section>
  );
};

export default Feedback;