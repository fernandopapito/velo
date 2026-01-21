-- Add optionals column to store selected optional features
ALTER TABLE public.orders ADD COLUMN optionals TEXT[] DEFAULT '{}';