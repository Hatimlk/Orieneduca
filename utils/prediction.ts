/**
 * Utility functions for Smart Seuil AI Predictor
 */

import { HISTORICAL_SEUILS } from '../constants';

/**
 * Calculates the predicted threshold for the next year (2026) using simple linear regression.
 * @param years Array of years (x-axis)
 * @param thresholds Array of thresholds (y-axis)
 * @returns Predicted threshold for the next year
 */
export const calculateLinearRegression = (years: number[], thresholds: number[]): number => {
    const n = years.length;
    if (n !== thresholds.length || n === 0) return 0;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let i = 0; i < n; i++) {
        sumX += years[i];
        sumY += thresholds[i];
        sumXY += years[i] * thresholds[i];
        sumXX += years[i] * years[i];
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const nextYear = 2026;
    return slope * nextYear + intercept;
};

/**
 * Calculates the probability of admission based on user score and predicted threshold.
 * Uses a logistic function-like curve for smooth probability distribution.
 * @param userScore The student's calculated score
 * @param predictedThreshold The predicted threshold for the school
 * @returns Probability between 0 and 100
 */
export const calculateAdmissionProbability = (userScore: number, predictedThreshold: number): number => {
    const gap = userScore - predictedThreshold;

    // If score is significantly higher, probability is near 100%
    if (gap >= 1.5) return 99;

    // If score is significantly lower, probability is near 0%
    if (gap <= -2) return 5;

    // Use a sigmoid-like mapping for the critical range [-2, +1.5]
    // Gap 0 => ~50%
    // Gap +0.5 => ~70%
    // Gap -0.5 => ~30%

    // Simple linear interpolation for the critical zone for transparency
    // Range [-2, 1.5] -> [5, 99]
    // Span = 3.5 points covers 94% probability

    const percent = 50 + (gap * 25); // +1 point adds 25% prob

    return Math.max(5, Math.min(99, percent));
};

/**
 * Gets the specific historical data for a school and branch
 */
export const getSchoolThresholds = (schoolName: string, branch: string) => {
    // Normalize branch names
    const normalizedBranch = branch.includes('SM') ? 'SM' :
        branch.includes('PC') ? 'PC' :
            branch.includes('SVT') ? 'SVT' :
                branch.includes('Eco') ? 'Eco' : 'Generic';

    return HISTORICAL_SEUILS.find(s =>
        s.school.toLowerCase().includes(schoolName.toLowerCase()) &&
        (s.branch === normalizedBranch || s.branch === 'All')
    );
};
