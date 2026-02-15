"use client"

import React, { useEffect, useRef } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface BlogModalProps {
    isOpen: boolean
    onClose: () => void
    blog: {
        slug: string
        image: string | null
        title: string
        date: string
        readTime: string
        excerpt: string
        content: string
    }
}

export function BlogModal({ isOpen, onClose, blog }: BlogModalProps) {
    const previousOverflow = useRef<string | undefined>(undefined)

    useEffect(() => {
        if (isOpen) {
            previousOverflow.current = document.body.style.overflow
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = previousOverflow.current || "unset"
        }

        return () => {
            document.body.style.overflow = previousOverflow.current || "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    // Render text content with preserved line breaks
    const renderContent = () => {
        if (!blog.content) {
            return <p className="text-muted-foreground">No content available.</p>
        }

        // Split by paragraphs (double newlines) and render each as a paragraph
        const paragraphs = blog.content.split('\n\n').filter((p: string) => p.trim())

        return paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="mb-4">
                {paragraph.trim()}
            </p>
        ))
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden">
                

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-5 z-20 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background shadow-lg"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 text-foreground" />
                </button>
                <div className="max-h-[90vh] overflow-y-auto">
                    {/* Blog Image */}
                    <div className="relative h-64 md:h-96 w-full">
                        <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                    </div>

                    {/* Blog Content */}
                    <div className="p-6 md:p-10">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                            <span>{blog.date}</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{blog.title}</h1>

                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed italic border-l-4 border-primary pl-4">
                            {blog.excerpt}
                        </p>

                        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground
                            prose-headings:text-foreground prose-headings:font-bold
                            prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
                            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                            prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                            prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                            prose-li:text-foreground/90 prose-li:my-2
                            prose-strong:text-foreground prose-strong:font-semibold
                            prose-em:text-foreground/90 prose-em:italic
                            prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
                            prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-pre:bg-muted prose-pre:border prose-pre:border-border
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                        ">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
