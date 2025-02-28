import React from "react";
import "../../static/header.css"

class GrowingSprout extends React.Component {
    render() {
        return (
            <div className="sprout-container">
                <svg
                    className="sprout"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <path
                        d="M50 90 C50 75, 50 65, 50 55"
                        stroke="#646d5f"
                        strokeWidth="4"
                        fill="none"
                        className="sprout-stem-lower"
                    />
                    <path
                        d="M50 55 C50 50, 48 45, 45 40"
                        stroke="#646d5f"
                        strokeWidth="3"
                        fill="none"
                        className="sprout-stem-upper"
                    />
                    <path
                        d="M50 60 C35 55, 20 50, 30 35 C38 45, 46 53, 50 60 Z"
                        fill="#646d5f"
                        className="sprout-leaf-left"
                    />
                    <path
                        d="M50 60 C65 55, 80 50, 70 35 C62 45, 54 53, 50 60 Z"
                        fill="#646d5f"
                        className="sprout-leaf-right"
                    />
                    <path
                        d="M45 40 C30 35, 22 33, 30 25 C40 30, 44 37, 45 40 Z"
                        fill="#646d5f"
                        className="sprout-leaf-top-left"
                    />
                    <path
                        d="M45 40 C52 37, 64 35, 58 25 C50 32, 46 37, 45 40 Z"
                        fill="#646d5f"
                        className="sprout-leaf-top-right"
                    />
                </svg>
            </div>
        )
    }
}

export default GrowingSprout;