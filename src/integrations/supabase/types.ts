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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_pro: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_pro?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_pro?: boolean | null
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_available_slots: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          available_slot: string
        }[]
      }
      get_daily_search_count: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
      get_daily_wikipedia_search_count: {
        Args: {
          user_uuid: string
        }
        Returns: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
