/**
 * Parola doğrulama fonksiyonları
 * Her fonksiyon belirli bir güvenlik kriterini kontrol eder
 */

// Zayıf parolalar listesi (basit bir sözlük)
export const WEAK_PASSWORDS = [
    'password', '123456', '12345678', '123456789', 'qwerty',
    'abc123', 'password1', 'admin', 'letmein', 'welcome',
    'monkey', 'football', 'iloveyou', '123123', '1234',
    '12345', '1234567', 'sunshine', 'master', 'hello',
    'charlie', 'aa123456', 'donald', 'password123', 'qwerty123',
    'admin123', 'pass', 'test', 'guest', 'temp', 'user'
];

// Sıralı karakter dizileri
export const SEQUENTIAL_PATTERNS = [
    '12345', '23456', '34567', '45678', '56789', '67890',
    'abcdef', 'bcdefg', 'cdefgh', 'defghi', 'efghij', 'fghijk',
    'ghijkl', 'hijklm', 'ijklmn', 'jklmno', 'klmnop', 'lmnopq',
    'mnopqr', 'nopqrs', 'opqrst', 'pqrstu', 'qrstuv', 'rstuvw',
    'stuvwx', 'tuvwxy', 'uvwxyz'
];

/**
 * Parola uzunluğunu kontrol eder
 * @param password Parola
 * @returns Uzunluk puanı (0-30)
 */
export function checkLength(password: string): number {
    if (password.length === 0) return 0;
    if (password.length < 6) return 5;
    if (password.length < 8) return 10;
    if (password.length < 12) return 20;
    return 30;
}

/**
 * Küçük harf içerip içermediğini kontrol eder
 * @param password Parola
 * @returns 0 veya 10 puan
 */
export function hasLowercase(password: string): number {
    return /[a-z]/.test(password) ? 10 : 0;
}

/**
 * Büyük harf içerip içermediğini kontrol eder
 * @param password Parola
 * @returns 0 veya 10 puan
 */
export function hasUppercase(password: string): number {
    return /[A-Z]/.test(password) ? 10 : 0;
}

/**
 * Rakam içerip içermediğini kontrol eder
 * @param password Parola
 * @returns 0 veya 10 puan
 */
export function hasNumbers(password: string): number {
    return /\d/.test(password) ? 10 : 0;
}

/**
 * Özel karakter içerip içermediğini kontrol eder
 * @param password Parola
 * @returns 0 veya 15 puan
 */
export function hasSpecialChars(password: string): number {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 15 : 0;
}

/**
 * Tekrarlanan karakterleri kontrol eder
 * @param password Parola
 * @returns Tekrarlama ceza puanı (0-15)
 */
export function checkRepeatingChars(password: string): number {
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
 * Sözlükteki zayıf parolaları kontrol eder
 * @param password Parola
 * @returns Zayıf parola ceza puanı (0-20)
 */
export function checkWeakPassword(password: string): number {
    const lowerPassword = password.toLowerCase();
    
    // Tam eşleşme kontrolü
    if (WEAK_PASSWORDS.includes(lowerPassword)) {
        return 20;
    }
    
    // Kısmi eşleşme kontrolü (parola zayıf bir parola içeriyorsa)
    for (const weakPass of WEAK_PASSWORDS) {
        if (lowerPassword.includes(weakPass) && weakPass.length >= 4) {
            return 15;
        }
    }
    
    return 0;
}

/**
 * Sıralı karakter dizilerini kontrol eder
 * @param password Parola
 * @returns Sıralı karakter ceza puanı (0-15)
 */
export function checkSequentialChars(password: string): number {
    const lowerPassword = password.toLowerCase();
    let penalty = 0;
    
    for (const pattern of SEQUENTIAL_PATTERNS) {
        if (lowerPassword.includes(pattern)) {
            penalty += 10;
        }
    }
    
    // Ardışık karakter kontrolü (abc, 123, vb.)
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
 * Karakter çeşitliliğini kontrol eder
 * @param password Parola
 * @returns Çeşitlilik bonus puanı (0-10)
 */
export function checkCharacterVariety(password: string): number {
    let varietyScore = 0;
    
    // Farklı karakter türlerini say
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    
    const charTypes = [hasLower, hasUpper, hasDigit, hasSpecial];
    const typeCount = charTypes.filter(Boolean).length;
    
    // Karakter türü sayısına göre puan ver
    if (typeCount === 4) varietyScore = 10;
    else if (typeCount === 3) varietyScore = 5;
    else if (typeCount === 2) varietyScore = 2;
    
    return varietyScore;
}

/**
 * Tüm validasyonları çalıştırır ve sonuçları döndürür
 * @param password Parola
 * @returns Validasyon sonuçları
 */
export function runAllValidations(password: string) {
    return {
        length: checkLength(password),
        hasLowercase: hasLowercase(password),
        hasUppercase: hasUppercase(password),
        hasNumbers: hasNumbers(password),
        hasSpecialChars: hasSpecialChars(password),
        repeatingCharsPenalty: checkRepeatingChars(password),
        weakPasswordPenalty: checkWeakPassword(password),
        sequentialCharsPenalty: checkSequentialChars(password),
        varietyBonus: checkCharacterVariety(password)
    };
}