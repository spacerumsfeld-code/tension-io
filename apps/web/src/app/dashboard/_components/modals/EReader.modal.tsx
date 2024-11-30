'use client'

import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from '@web/src/components/ui/animated-modal'
import { Button } from '@web/src/components/ui/buttonTwo'
import { ScrollArea } from '@web/src/components/ui/scroll-area'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Slider } from '@web/src/components/ui/slider'
import { motion, AnimatePresence } from 'framer-motion'
import { TStoryWithScenes } from '@client-types/story/story.model'

export const EReaderModal = (props: {
    story: TStoryWithScenes
    children: React.ReactNode
}) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
    const [fontSize, setFontSize] = useState(16)

    const { story } = props
    const totalScenes = story.scenes.length

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrevScene()
            if (e.key === 'ArrowRight') handleNextScene()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentSceneIndex])

    const handlePrevScene = () => {
        setCurrentSceneIndex((prev) => Math.max(prev - 1, 0))
    }

    const handleNextScene = () => {
        setCurrentSceneIndex((prev) => Math.min(prev + 1, totalScenes - 1))
    }

    const handleFontSizeChange = (newSize: number[]) => {
        setFontSize(newSize[0])
    }

    const currentScene = story.scenes[currentSceneIndex]

    return (
        <Modal>
            <ModalTrigger>{props.children}</ModalTrigger>
            <ModalBody>
                <ModalContent>
                    <div
                        className={`flex flex-col h-[90vh] bg-amber-50 transition-colors duration-300`}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold">
                                {story.title}
                            </h2>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            <ScrollArea className="h-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSceneIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                        className="p-8 space-y-4 min-h-full flex flex-col justify-between"
                                        style={{
                                            backgroundColor: '#fff9e6',
                                            boxShadow:
                                                'inset 0 0 10px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <div>
                                            <div
                                                className="prose dark:prose-invert max-w-none"
                                                style={{
                                                    fontSize: `${fontSize}px`,
                                                    lineHeight: '1.8',
                                                    textAlign: 'justify',
                                                    columnCount: 1,
                                                    columnGap: '2rem',
                                                }}
                                            >
                                                {currentScene.content
                                                    .split('#')
                                                    .map((paragraph) => (
                                                        <p key={paragraph}>
                                                            {paragraph}
                                                            <br />
                                                            <br />
                                                        </p>
                                                    ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
                                            <Button
                                                variant="ghost"
                                                onClick={handlePrevScene}
                                                disabled={
                                                    currentSceneIndex === 0
                                                }
                                                aria-label="Previous scene"
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-2" />
                                                Previous
                                            </Button>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm">
                                                    Aa
                                                </span>
                                                <Slider
                                                    value={[fontSize]}
                                                    onValueChange={
                                                        handleFontSizeChange
                                                    }
                                                    min={12}
                                                    max={24}
                                                    step={1}
                                                    className="w-32"
                                                />
                                                <span className="text-sm">
                                                    Aa
                                                </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                onClick={handleNextScene}
                                                disabled={
                                                    currentSceneIndex ===
                                                    totalScenes - 1
                                                }
                                                aria-label="Next scene"
                                            >
                                                Next
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </ScrollArea>
                        </div>
                    </div>
                </ModalContent>
            </ModalBody>
        </Modal>
    )
}
