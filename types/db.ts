/**
 * Database Types
 * Generated from Supabase schema
 * 
 * These types provide full type safety for database operations
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string | null;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          body: string;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email?: string | null;
          body: string;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          body?: string;
          source?: string | null;
          created_at?: string;
        };
      };
      experiments: {
        Row: {
          id: string;
          title: string;
          one_liner: string;
          status: 'ideating' | 'testing' | 'shipped' | 'killed';
          cta_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          one_liner: string;
          status: 'ideating' | 'testing' | 'shipped' | 'killed';
          cta_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          one_liner?: string;
          status?: 'ideating' | 'testing' | 'shipped' | 'killed';
          cta_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type Waitlist = Database['public']['Tables']['waitlist']['Row'];
export type WaitlistInsert = Database['public']['Tables']['waitlist']['Insert'];
export type WaitlistUpdate = Database['public']['Tables']['waitlist']['Update'];

export type Message = Database['public']['Tables']['messages']['Row'];
export type MessageInsert = Database['public']['Tables']['messages']['Insert'];
export type MessageUpdate = Database['public']['Tables']['messages']['Update'];

export type Experiment = Database['public']['Tables']['experiments']['Row'];
export type ExperimentInsert =
  Database['public']['Tables']['experiments']['Insert'];
export type ExperimentUpdate =
  Database['public']['Tables']['experiments']['Update'];

export type ExperimentStatus = Experiment['status'];
