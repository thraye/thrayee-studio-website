'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const StyleFinder = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const questions = [
    {
      question: 'What colors appeal to you?',
      options: ['Warm & Neutral', 'Bold & Vibrant', 'Minimal & Cool'],
    },
    {
      question: 'Modern or Traditional?',
      options: ['Modern', 'Traditional', 'Blend of Both'],
    },
    {
      question: 'Minimal or Luxury?',
      options: ['Minimal', 'Luxury', 'Balanced'],
    },
    {
      question: 'Wood or Matte?',
      options: ['Wood Finish', 'Matte', 'Mix'],
    },
  ]

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = option
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Find Your Design Style</h2>
          <p className="text-gray-600">Answer a few quick questions to discover your perfect interior style</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-cream p-8 rounded-lg"
        >
          {!showResult ? (
            <div>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                  <div className="w-32 h-2 bg-light-gray rounded-full overflow-hidden">
                    <div
                      className="h-full bg-olive transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left border-2 border-light-gray rounded-lg hover:border-olive hover:bg-olive/5 transition-all duration-300 font-medium text-charcoal"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">Your Style: Modern Minimalist</h3>
              <p className="text-gray-600 mb-6">Contemporary, sleek designs with clean lines</p>
              <p className="text-gray-600 mb-8">Based on your preferences, we recommend exploring modern minimal designs that emphasize functionality and elegance.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={reset} className="btn btn-secondary">
                  Take Quiz Again
                </button>
                <button className="btn btn-primary">
                  Get Free Quotation
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default StyleFinder
