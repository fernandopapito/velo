import { describe, it, expect } from 'vitest'
import { isValidCpf, isValidEmailStrict, onlyDigits } from './validators'

describe('Validators', () => {
  describe('onlyDigits', () => {
    it('should strip all non-digit characters', () => {
      expect(onlyDigits('123.456.789-00')).toBe('12345678900')
      expect(onlyDigits('(11) 98765-4321')).toBe('11987654321')
      expect(onlyDigits('abc123def456')).toBe('123456')
    })
  })

  describe('isValidCpf', () => {
    it('should return true for a valid CPF', () => {
      // Valid CPF generator used for this test: 52998224725
      expect(isValidCpf('52998224725')).toBe(true)
      expect(isValidCpf('529.982.247-25')).toBe(true)
    })

    it('should return false for CPF with wrong length', () => {
      expect(isValidCpf('1234567890')).toBe(false) // 10 digits
      expect(isValidCpf('123456789012')).toBe(false) // 12 digits
    })

    it('should return false for CPF with all same digits', () => {
      expect(isValidCpf('11111111111')).toBe(false)
      expect(isValidCpf('222.222.222-22')).toBe(false)
      expect(isValidCpf('99999999999')).toBe(false)
    })

    it('should return false for invalid CPF calculation', () => {
      // Changed one digit from a valid CPF
      expect(isValidCpf('52998224726')).toBe(false)
    })
  })

  describe('isValidEmailStrict', () => {
    it('should return true for standard valid emails', () => {
      expect(isValidEmailStrict('user@example.com')).toBe(true)
      expect(isValidEmailStrict('firstname.lastname@domain.co.uk')).toBe(true)
    })

    it('should return false for emails without @ or domain', () => {
      expect(isValidEmailStrict('userexample.com')).toBe(false)
      expect(isValidEmailStrict('user@')).toBe(false)
      expect(isValidEmailStrict('user@example')).toBe(false) // missing TLD in strict check
    })

    it('should return false for emails with consecutive dots', () => {
      expect(isValidEmailStrict('user@example..com')).toBe(false)
      expect(isValidEmailStrict('user..name@example.com')).toBe(false)
    })

    it('should return false for emails with dot immediately after @', () => {
      expect(isValidEmailStrict('user@.example.com')).toBe(false)
    })

    it('should return false for emails with spaces', () => {
      expect(isValidEmailStrict('user name@example.com')).toBe(false)
    })
  })
})
