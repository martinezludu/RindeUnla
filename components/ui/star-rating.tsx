"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  label: string
  description?: string
  disabled?: boolean
}

export function StarRating({ value, onChange, label, description, disabled = false }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const handleClick = (rating: number) => {
    if (!disabled) {
      onChange(rating)
    }
  }

  const handleMouseEnter = (rating: number) => {
    if (!disabled) {
      setHoverValue(rating)
    }
  }

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverValue(0)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              disabled={disabled}
              className={cn(
                "transition-colors duration-150",
                disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-110 transition-transform",
              )}
            >
              <Star
                className={cn(
                  "h-6 w-6",
                  hoverValue >= star || value >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
                )}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600 min-w-[20px]">{value > 0 ? value : ""}</span>
        </div>
      </div>
    </div>
  )
}
