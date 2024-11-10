import React from "react";
import { motion } from "framer-motion";

export const Testimonials = (props) => {
  // Animation variants for each testimonial
  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="testimonials" style={{ height: "100vh" }}>
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <motion.div
                  key={`${d.name}-${i}`}
                  className="col-md-4"
                  initial="hidden"
                  whileInView="visible"
                  variants={testimonialVariants}
                  transition={{ duration: 0.5, delay: i * 0.1 }} // Add a delay for each testimonial
                  viewport={{ once: false }} // Keep observing for multiple scrolls
                >
                  <div className="testimonial">
                    <div className="testimonial-image">
                      <img src={d.img} alt="" />
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> - {d.name} </div>
                    </div>
                  </div>
                </motion.div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
