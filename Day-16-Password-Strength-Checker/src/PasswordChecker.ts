/**
 * PasswordChecker.ts - Password strength analysis and scoring algorithm
 */

/**
 * Password strength levels
 */
export enum StrengthLevel {
    EMPTY = 'empty',
    VERY_WEAK = 'very weak',
    WEAK = 'weak',
    MEDIUM = 'medium',
    STRONG = 'strong',
    VERY_STRONG = 'very strong'
}

/**
 * Password analysis results interface
 */
export interface PasswordAnalysis {
    score: number;
    level: StrengthLevel;
    criteria: {
        length: boolean;
        hasLowercase: boolean;
        hasUppercase: boolean;
        hasNumbers: boolean;
        hasSpecialChars: boolean;
        noRepeatingChars: boolean;
        notWeakPassword: boolean;
        noSequentialChars: boolean;
    };
    feedback: string[];
    suggestions: string[];
}

/**
 * Validation results interface
 */
interface ValidationResults {
    length: number;
    hasLowercase: number;
    hasUppercase: number;
    hasNumbers: number;
    hasSpecialChars: number;
    repeatingCharsPenalty: number;
    weakPasswordPenalty: number;
    sequentialCharsPenalty: number;
    varietyBonus: number;
}

/**
 * Main password checker class
 */
export class PasswordChecker {
    
    /**
     * Analyze password and return detailed results
     * @param password Password to analyze
     * @returns Analysis results
     */
    static analyze(password: string): PasswordAnalysis {
        // Handle empty password
        if (!password || password.length === 0) {
            return this.getEmptyAnalysis();
        }
        
        // Run all validations
        const validationResults = this.runAllValidations(password);
        
        // Calculate total score
        let totalScore = 
            validationResults.length +
            validationResults.hasLowercase +
            validationResults.hasUppercase +
            validationResults.hasNumbers +
            validationResults.hasSpecialChars +
            validationResults.varietyBonus;
        
        // Subtract penalties
        totalScore -= 
            validationResults.repeatingCharsPenalty +
            validationResults.weakPasswordPenalty +
            validationResults.sequentialCharsPenalty;
        
        // Clamp score between 0 and 100
        totalScore = Math.max(0, Math.min(totalScore, 100));
        
        // Determine strength level
        const level = this.determineStrengthLevel(totalScore);
        
        // Evaluate criteria
        const criteria = {
            length: validationResults.length >= 20,
            hasLowercase: validationResults.hasLowercase > 0,
            hasUppercase: validationResults.hasUppercase > 0,
            hasNumbers: validationResults.hasNumbers > 0,
            hasSpecialChars: validationResults.hasSpecialChars > 0,
            noRepeatingChars: validationResults.repeatingCharsPenalty === 0,
            notWeakPassword: validationResults.weakPasswordPenalty === 0,
            noSequentialChars: validationResults.sequentialCharsPenalty === 0
        };
        
        // Generate feedback messages
        const feedback = this.generateFeedback(password, criteria);
        
        // Generate suggestions
        const suggestions = this.generateSuggestions(criteria, totalScore);
        
        return {
            score: Math.round(totalScore),
            level,
            criteria,
            feedback,
            suggestions
        };
    }
    
    /**
     * Get analysis results for empty password
     */
    private static getEmptyAnalysis(): PasswordAnalysis {
        return {
            score: 0,
            level: StrengthLevel.EMPTY,
            criteria: {
                length: false,
                hasLowercase: false,
                hasUppercase: false,
                hasNumbers: false,
                hasSpecialChars: false,
                noRepeatingChars: false,
                notWeakPassword: false,
                noSequentialChars: false
            },
            feedback: ['Please enter a password to analyze'],
            suggestions: ['Password should be at least 8 characters long']
        };
    }
    
    /**
     * Determine strength level based on score
     * @param score Password score (0-100)
     * @returns Strength level
     */
    private static determineStrengthLevel(score: number): StrengthLevel {
        if (score === 0) return StrengthLevel.EMPTY;
        if (score < 20) return StrengthLevel.VERY_WEAK;
        if (score < 40) return StrengthLevel.WEAK;
        if (score < 60) return StrengthLevel.MEDIUM;
        if (score < 80) return StrengthLevel.STRONG;
        return StrengthLevel.VERY_STRONG;
    }
    
    /**
     * Run all validation checks on password
     * @param password Password to validate
     * @returns Validation results
     */
    private static runAllValidations(password: string): ValidationResults {
        return {
            length: this.checkLength(password),
            hasLowercase: this.hasLowercase(password),
            hasUppercase: this.hasUppercase(password),
            hasNumbers: this.hasNumbers(password),
            hasSpecialChars: this.hasSpecialChars(password),
            repeatingCharsPenalty: this.checkRepeatingChars(password),
            weakPasswordPenalty: this.checkWeakPassword(password),
            sequentialCharsPenalty: this.checkSequentialChars(password),
            varietyBonus: this.checkCharacterVariety(password)
        };
    }
    
    /**
     * Check password length
     */
    private static checkLength(password: string): number {
        if (password.length === 0) return 0;
        if (password.length < 6) return 5;
        if (password.length < 8) return 10;
        if (password.length < 12) return 20;
        return 30;
    }
    
    /**
     * Check for lowercase letters
     */
    private static hasLowercase(password: string): number {
        return /[a-z]/.test(password) ? 10 : 0;
    }
    
    /**
     * Check for uppercase letters
     */
    private static hasUppercase(password: string): number {
        return /[A-Z]/.test(password) ? 10 : 0;
    }
    
    /**
     * Check for numbers
     */
    private static hasNumbers(password: string): number {
        return /\d/.test(password) ? 10 : 0;
    }
    
    /**
     * Check for special characters
     */
    private static hasSpecialChars(password: string): number {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 15 : 0;
    }
    
    /**
     * Check for repeating characters
     */
    private static checkRepeatingChars(password: string): number {
        if (password.length < 3) return 0;
        
        let penalty = 0;
        let repeatCount = 1;
        
        for (let i = 1; i < password.length; i++) {
            if (password[i] === password[i - 1]) {
                repeatCount++;
                if (repeatCount >= 3) {
                    penalty += 5;
                }
            } else {
                repeatCount = 1;
            }
        }
        
        return Math.min(penalty, 15);
    }
    
    /**
     * Check if password is weak (common password)
     */
    private static checkWeakPassword(password: string): number {
        const weakPasswords = [
            'password', '123456', '12345678', '123456789', 'qwerty',
            'abc123', 'password1', 'admin', 'letmein', 'welcome',
            'monkey', 'football', 'iloveyou', '123123', '1234',
            '12345', '1234567', 'sunshine', 'master', 'hello'
        ];
        
        const lowerPassword = password.toLowerCase();
        
        // Exact match
        if (weakPasswords.includes(lowerPassword)) {
            return 20;
        }
        
        // Partial match
        for (const weakPass of weakPasswords) {
            if (lowerPassword.includes(weakPass) && weakPass.length >= 4) {
                return 15;
            }
        }
        
        return 0;
    }
    
    /**
     * Check for sequential characters
     */
    private static checkSequentialChars(password: string): number {
        const sequentialPatterns = [
            '12345', '23456', '34567', '45678', '56789', '67890',
            'abcdef', 'bcdefg', 'cdefgh', 'defghi', 'efghij',
            'fghijk', 'ghijkl', 'hijklm', 'ijklmn', 'jklmno',
            'klmnop', 'lmnopq', 'mnopqr', 'nopqrs', 'opqrst'
        ];
        
        const lowerPassword = password.toLowerCase();
        let penalty = 0;
        
        // Check for sequential patterns
        for (const pattern of sequentialPatterns) {
            if (lowerPassword.includes(pattern)) {
                penalty += 10;
            }
        }
        
        // Check for sequential characters (abc, 123, etc.)
        for (let i = 0; i < password.length - 2; i++) {
            const charCode1 = password.charCodeAt(i);
            const charCode2 = password.charCodeAt(i + 1);
            const charCode3 = password.charCodeAt(i + 2);
            
            if (
                (charCode2 === charCode1 + 1 && charCode3 === charCode2 + 1) ||
                (charCode2 === charCode1 - 1 && charCode3 === charCode2 - 1)
            ) {
                penalty += 5;
                break;
            }
        }
        
        return Math.min(penalty, 15);
    }
    
    /**
     * Check character variety bonus
     */
    private static checkCharacterVariety(password: string): number {
        let varietyScore = 0;
        
        // Count different character types
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);
        
        const typeCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
        
        // Give bonus based on variety
        if (typeCount === 4) varietyScore = 10;
        else if (typeCount === 3) varietyScore = 5;
        else if (typeCount === 2) varietyScore = 2;
        
        return varietyScore;
    }
    
    /**
     * Generate feedback messages
     */
    private static generateFeedback(
        password: string,
        criteria: PasswordAnalysis['criteria']
    ): string[] {
        const feedback: string[] = [];
        
        // Length feedback
        if (password.length < 8) {
            feedback.push(`Password is too short (${password.length} characters). Minimum 8 characters recommended.`);
        } else if (password.length < 12) {
            feedback.push(`Password is medium length (${password.length} characters). 12+ characters is more secure.`);
        } else {
            feedback.push(`Good password length (${password.length} characters).`);
        }
        
        // Character type feedback
        if (!criteria.hasLowercase) {
            feedback.push('Missing lowercase letters. Add some lowercase letters (a-z).');
        }
        
        if (!criteria.hasUppercase) {
            feedback.push('Missing uppercase letters. Add some uppercase letters (A-Z).');
        }
        
        if (!criteria.hasNumbers) {
            feedback.push('Missing numbers. Add some numbers (0-9).');
        }
        
        if (!criteria.hasSpecialChars) {
            feedback.push('Missing special characters. Add some special characters (!@#$%^&* etc.).');
        }
        
        // Penalty feedback
        if (!criteria.noRepeatingChars) {
            feedback.push('Contains repeating characters. Try to avoid character repetitions.');
        }
        
        if (!criteria.notWeakPassword) {
            feedback.push('Password contains common words or patterns.');
        }
        
        if (!criteria.noSequentialChars) {
            feedback.push('Contains sequential characters (like abc, 123).');
        }
        
        // Positive feedback
        const positiveCount = Object.values(criteria).filter(Boolean).length;
        if (positiveCount >= 6) {
            feedback.push('Excellent! Your password meets most security criteria.');
        } else if (positiveCount >= 4) {
            feedback.push('Good start! Your password could be stronger with more variety.');
        }
        
        return feedback;
    }
    
    /**
     * Generate suggestion messages
     */
    private static generateSuggestions(criteria: PasswordAnalysis['criteria'], score: number): string[] {
        const suggestions: string[] = [];
        
        if (score < 50) {
            suggestions.push('To strengthen your password:');
        }
        
        if (!criteria.length) {
            suggestions.push('• Increase length to at least 12 characters');
        }
        
        if (!criteria.hasLowercase) {
            suggestions.push('• Add lowercase letters (a-z)');
        }
        
        if (!criteria.hasUppercase) {
            suggestions.push('• Add uppercase letters (A-Z)');
        }
        
        if (!criteria.hasNumbers) {
            suggestions.push('• Add numbers (0-9)');
        }
        
        if (!criteria.hasSpecialChars) {
            suggestions.push('• Add special characters (!@#$%^&* etc.)');
        }
        
        if (!criteria.noRepeatingChars) {
            suggestions.push('• Avoid repeating the same character multiple times');
        }
        
        if (!criteria.notWeakPassword) {
            suggestions.push('• Avoid common words and predictable patterns');
        }
        
        if (!criteria.noSequentialChars) {
            suggestions.push('• Avoid sequential characters (abc, 123, etc.)');
        }
        
        if (score >= 70) {
            suggestions.push('Good job! Your password has decent security.');
        }
        
        if (score >= 85) {
            suggestions.push('Excellent! Your password is very secure.');
        }
        
        return suggestions;
    }
    
    /**
     * Simple and reliable time to crack estimation
     * @param password Password to check
     * @param score Password score (used for estimation)
     * @returns Estimated cracking time as string
     */
    static estimateTimeToCrack(password: string, score: number): string {
        // Basic input validation
        if (!password || password.trim().length === 0) {
            return 'Please enter a password';
        }
        
        const length = password.length;
        
        // Combined estimation based on score and length
        if (score < 20 || length < 6) return 'Instantly';
        if (score < 30) return 'Seconds';
        if (score < 40) return 'Minutes';
        if (score < 50) return 'Hours';
        if (score < 60) return 'Days';
        if (score < 70) return 'Weeks';
        if (score < 80) return 'Months';
        if (score < 90) return 'Years';
        
        // Strong passwords
        if (length >= 16) return 'Decades';
        if (length >= 12) return 'Years to decades';
        
        return 'Years';
    }
}