export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anonymous_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: string
          session_id?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          points: number | null
          requirement_count: number
          requirement_type: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          points?: number | null
          requirement_count: number
          requirement_type: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          points?: number | null
          requirement_count?: number
          requirement_type?: string
        }
        Relationships: []
      }
      business_insights: {
        Row: {
          content: string
          created_at: string
          id: string
          insight_type: string
          relevance_score: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          insight_type: string
          relevance_score?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          insight_type?: string
          relevance_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      business_metrics: {
        Row: {
          created_at: string
          expenses: number | null
          id: string
          inventory_count: number | null
          metric_date: string
          revenue: number | null
          sales_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expenses?: number | null
          id?: string
          inventory_count?: number | null
          metric_date?: string
          revenue?: number | null
          sales_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          expenses?: number | null
          id?: string
          inventory_count?: number | null
          metric_date?: string
          revenue?: number | null
          sales_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          challenge_type: string
          created_at: string
          description: string
          end_date: string
          id: string
          points: number | null
          requirement_count: number
          start_date: string
          title: string
        }
        Insert: {
          challenge_type: string
          created_at?: string
          description: string
          end_date: string
          id?: string
          points?: number | null
          requirement_count: number
          start_date: string
          title: string
        }
        Update: {
          challenge_type?: string
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          points?: number | null
          requirement_count?: number
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      collection_entries: {
        Row: {
          category: string | null
          collection_id: string | null
          created_at: string
          growth_stage: string | null
          id: string
          notes: string | null
          plant_id: string | null
        }
        Insert: {
          category?: string | null
          collection_id?: string | null
          created_at?: string
          growth_stage?: string | null
          id?: string
          notes?: string | null
          plant_id?: string | null
        }
        Update: {
          category?: string | null
          collection_id?: string | null
          created_at?: string
          growth_stage?: string | null
          id?: string
          notes?: string | null
          plant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_entries_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "plant_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_entries_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_bookings: {
        Row: {
          booking_date: string
          created_at: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          booking_date: string
          created_at?: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          created_at?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      educational_resources: {
        Row: {
          content: string | null
          created_at: string
          id: string
          resource_type: string
          title: string
          url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          resource_type: string
          title: string
          url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          resource_type?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      "New pro version": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      pest_disease_predictions: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          image_url: string | null
          plant_id: string
          prediction_type: string
          recommendations: string[] | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          image_url?: string | null
          plant_id: string
          prediction_type: string
          recommendations?: string[] | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          image_url?: string | null
          plant_id?: string
          prediction_type?: string
          recommendations?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pest_disease_predictions_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      plant_collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      plant_performance: {
        Row: {
          cost: number | null
          created_at: string
          id: string
          performance_date: string
          plant_id: string
          revenue: number | null
          sales_volume: number | null
          user_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          id?: string
          performance_date?: string
          plant_id: string
          revenue?: number | null
          sales_volume?: number | null
          user_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          id?: string
          performance_date?: string
          plant_id?: string
          revenue?: number | null
          sales_volume?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_performance_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      plants: {
        Row: {
          created_at: string
          description: string | null
          growth_conditions: Json | null
          id: string
          image_url: string | null
          medicinal_uses: string[] | null
          name: string
          scientific_name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          growth_conditions?: Json | null
          id?: string
          image_url?: string | null
          medicinal_uses?: string[] | null
          name: string
          scientific_name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          growth_conditions?: Json | null
          id?: string
          image_url?: string | null
          medicinal_uses?: string[] | null
          name?: string
          scientific_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pro_educational_content: {
        Row: {
          content_type: string
          content_url: string
          created_at: string
          description: string | null
          id: string
          title: string
        }
        Insert: {
          content_type: string
          content_url: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          content_type?: string
          content_url?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_pro: boolean | null
          preferred_language: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_pro?: boolean | null
          preferred_language?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_pro?: boolean | null
          preferred_language?: string | null
        }
        Relationships: []
      }
      soil_analysis: {
        Row: {
          created_at: string
          id: string
          nitrogen_level: number | null
          organic_matter_percentage: number | null
          ph_level: number | null
          phosphorus_level: number | null
          potassium_level: number | null
          recommendations: string[] | null
          test_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nitrogen_level?: number | null
          organic_matter_percentage?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recommendations?: string[] | null
          test_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nitrogen_level?: number | null
          organic_matter_percentage?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recommendations?: string[] | null
          test_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          description: string
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          created_at: string
          id: string
          last_scan_date: string | null
          streak_count: number | null
          total_points: number | null
          total_scans: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_scan_date?: string | null
          streak_count?: number | null
          total_points?: number | null
          total_scans?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_scan_date?: string | null
          streak_count?: number | null
          total_points?: number | null
          total_scans?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenge_progress: {
        Row: {
          challenge_id: string
          completed: boolean | null
          created_at: string
          id: string
          progress: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean | null
          created_at?: string
          id?: string
          progress?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean | null
          created_at?: string
          id?: string
          progress?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_searches: {
        Row: {
          created_at: string
          id: string
          search_keyword: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          search_keyword: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          search_keyword?: string
          user_id?: string
        }
        Relationships: []
      }
      wikipedia_searches: {
        Row: {
          created_at: string
          id: string
          search_query: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          search_query: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          search_query?: string
          user_id?: string
        }
        Relationships: []
      }
      yield_estimations: {
        Row: {
          actual_yield: number | null
          created_at: string
          estimated_yield: number | null
          estimation_date: string | null
          growing_conditions: Json | null
          id: string
          plant_id: string
          recommendations: string[] | null
          user_id: string
        }
        Insert: {
          actual_yield?: number | null
          created_at?: string
          estimated_yield?: number | null
          estimation_date?: string | null
          growing_conditions?: Json | null
          id?: string
          plant_id: string
          recommendations?: string[] | null
          user_id: string
        }
        Update: {
          actual_yield?: number | null
          created_at?: string
          estimated_yield?: number | null
          estimation_date?: string | null
          growing_conditions?: Json | null
          id?: string
          plant_id?: string
          recommendations?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yield_estimations_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_available_slots: {
        Args: { start_date: string; end_date: string }
        Returns: {
          available_slot: string
        }[]
      }
      get_daily_search_count: {
        Args: { user_uuid: string }
        Returns: number
      }
      get_daily_wikipedia_search_count: {
        Args: { user_uuid: string }
        Returns: number
      }
      get_scan_limit: {
        Args: { user_id: string }
        Returns: number
      }
      is_pro_user: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
