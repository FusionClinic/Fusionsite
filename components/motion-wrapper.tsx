"use client"

import { motion, type Variants } from "framer-motion"
import { type ReactNode } from "react"

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const scaleOnTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
}

const cardHover = {
  y: -8,
  transition: { duration: 0.3, ease: "easeOut" },
}

interface FadeInUpProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeInUp({ children, className, delay = 0 }: FadeInUpProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  )
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
}

export function AnimatedCard({ children, className }: AnimatedCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={cardHover}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function AnimatedButton({ children, className, onClick }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={scaleOnTap}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export { fadeInUp, staggerContainer, scaleOnTap, cardHover }
