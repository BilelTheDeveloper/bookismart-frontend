import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  },
];

const TiltCard = ({ children, onClick }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef, setCardRef] = useState(null);

  const handleMouseMove = (e) => {
    const card = cardRef;
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
      ref={setCardRef}
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
      <motion.div className="absolute inset-0 rounded-[2rem] bg-indigo-500/5 blur-xl" style={{ opacity: isHovered ? 1 : 0 }} />
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
            className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm"
          />
          <motion.div
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
            style={{ perspective: 2000 }}
          >
            <motion.div
              className="pointer-events-auto mx-4 w-full max-w-lg"
              initial={{ rotateX: 90, opacity: 0, scale: 0.8, y: 80 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1, y: 0 }}
              exit={{ rotateX: -90, opacity: 0, scale: 0.8, y: -80 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="overflow-hidden rounded-[2rem] bg-white shadow-2xl"
                whileHover={{ scale: 1.01 }}
              >
                <div className={`h-2 bg-gradient-to-r ${feedback.color}`} />
                <div className="p-8">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500"
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

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      <div className="absolute inset-0">
        <motion.div
          className="absolute -left-10 top-0 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl"
          animate={{ y: [0, -28, 0], x: [0, -24, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {feedbacks.map((f, i) => {
            return (
              <TiltCard key={f.id} onClick={() => setSelectedFeedback(f)}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                  className="flex h-full flex-col justify-between rounded-[2rem] border border-slate-100 bg-white p-7 shadow-lg shadow-slate-200/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl shadow-inner">
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
          className="mt-16 flex flex-wrap justify-center gap-8 border-t border-slate-200 pt-12 md:gap-20"
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