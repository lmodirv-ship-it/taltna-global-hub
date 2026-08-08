export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          active: boolean
          clicks: number
          created_at: string
          ends_at: string | null
          id: string
          image_url: string | null
          impressions: number
          placement: string
          starts_at: string | null
          target_url: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          clicks?: number
          created_at?: string
          ends_at?: string | null
          id?: string
          image_url?: string | null
          impressions?: number
          placement?: string
          starts_at?: string | null
          target_url: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          clicks?: number
          created_at?: string
          ends_at?: string | null
          id?: string
          image_url?: string | null
          impressions?: number
          placement?: string
          starts_at?: string | null
          target_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      answers: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          is_best: boolean
          question_id: string
          score: number
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          is_best?: boolean
          question_id: string
          score?: number
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          is_best?: boolean
          question_id?: string
          score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string
          category_id: string | null
          content: string
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_featured: boolean
          language: string
          published_at: string | null
          reading_minutes: number
          reads: number
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category_id?: string | null
          content: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean
          language?: string
          published_at?: string | null
          reading_minutes?: number
          reads?: number
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category_id?: string | null
          content?: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean
          language?: string
          published_at?: string | null
          reading_minutes?: number
          reads?: number
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          emoji: string | null
          icon: string | null
          id: string
          name_ar: string
          name_en: string | null
          name_fr: string | null
          parent_id: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          emoji?: string | null
          icon?: string | null
          id?: string
          name_ar: string
          name_en?: string | null
          name_fr?: string | null
          parent_id?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          color?: string | null
          created_at?: string
          emoji?: string | null
          icon?: string | null
          id?: string
          name_ar?: string
          name_en?: string | null
          name_fr?: string | null
          parent_id?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          body: string
          created_at: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          id: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          id?: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_kind"]
          id?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_members: {
        Row: {
          conversation_id: string
          joined_at: string
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          joined_at?: string
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          joined_at?: string
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          is_group: boolean
          last_message_at: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_group?: boolean
          last_message_at?: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_group?: boolean
          last_message_at?: string
          title?: string | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          parent_id: string | null
          topic_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          author_id: string
          body: string
          category_id: string | null
          created_at: string
          id: string
          is_locked: boolean
          is_pinned: boolean
          last_reply_at: string
          last_reply_by: string | null
          reply_count: number
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id: string
          body: string
          category_id?: string | null
          created_at?: string
          id?: string
          is_locked?: boolean
          is_pinned?: boolean
          last_reply_at?: string
          last_reply_by?: string | null
          reply_count?: number
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string
          body?: string
          category_id?: string | null
          created_at?: string
          id?: string
          is_locked?: boolean
          is_pinned?: boolean
          last_reply_at?: string
          last_reply_by?: string | null
          reply_count?: number
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_topics_last_reply_by_fkey"
            columns: ["last_reply_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          avatar_url: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          is_private: boolean
          member_count: number
          name: string
          owner_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_private?: boolean
          member_count?: number
          name: string
          owner_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_private?: boolean
          member_count?: number
          name?: string
          owner_id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hn_apps: {
        Row: {
          base_url: string | null
          created_at: string
          id: string
          is_active: boolean
          key: string
          name: string
        }
        Insert: {
          base_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key: string
          name: string
        }
        Update: {
          base_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key?: string
          name?: string
        }
        Relationships: []
      }
      hn_roles: {
        Row: {
          created_at: string
          dashboard_path: string
          id: string
          key: string
          level: number
          name_ar: string
          name_en: string | null
          name_fr: string | null
        }
        Insert: {
          created_at?: string
          dashboard_path?: string
          id?: string
          key: string
          level?: number
          name_ar: string
          name_en?: string | null
          name_fr?: string | null
        }
        Update: {
          created_at?: string
          dashboard_path?: string
          id?: string
          key?: string
          level?: number
          name_ar?: string
          name_en?: string | null
          name_fr?: string | null
        }
        Relationships: []
      }
      hn_user_roles_apps: {
        Row: {
          app_key: string
          created_at: string
          granted_by: string | null
          id: string
          role_key: string
          user_id: string
        }
        Insert: {
          app_key?: string
          created_at?: string
          granted_by?: string | null
          id?: string
          role_key?: string
          user_id: string
        }
        Update: {
          app_key?: string
          created_at?: string
          granted_by?: string | null
          id?: string
          role_key?: string
          user_id?: string
        }
        Relationships: []
      }
      hn_users: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          is_active: boolean
          last_seen_at: string | null
          origin_app: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          is_active?: boolean
          last_seen_at?: string | null
          origin_app?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          is_active?: boolean
          last_seen_at?: string | null
          origin_app?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hn_visits: {
        Row: {
          app_key: string
          created_at: string
          id: string
          is_member: boolean
          path: string | null
          session_id: string
        }
        Insert: {
          app_key?: string
          created_at?: string
          id?: string
          is_member?: boolean
          path?: string | null
          session_id: string
        }
        Update: {
          app_key?: string
          created_at?: string
          id?: string
          is_member?: boolean
          path?: string | null
          session_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_url: string | null
          body: string
          conversation_id: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          attachment_url?: string | null
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          attachment_url?: string | null
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          actor_id: string | null
          body: string | null
          created_at: string
          entity_id: string | null
          entity_type: Database["public"]["Enums"]["entity_kind"] | null
          id: string
          read_at: string | null
          title: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          body?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: Database["public"]["Enums"]["entity_kind"] | null
          id?: string
          read_at?: string | null
          title?: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          actor_id?: string | null
          body?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: Database["public"]["Enums"]["entity_kind"] | null
          id?: string
          read_at?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          cover_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          is_verified: boolean
          language: string
          level: number
          reputation: number
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          is_verified?: boolean
          language?: string
          level?: number
          reputation?: number
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_verified?: boolean
          language?: string
          level?: number
          reputation?: number
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer_count: number
          author_id: string
          best_answer_id: string | null
          body: string
          category_id: string | null
          created_at: string
          id: string
          is_resolved: boolean
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          answer_count?: number
          author_id: string
          best_answer_id?: string | null
          body: string
          category_id?: string | null
          created_at?: string
          id?: string
          is_resolved?: boolean
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          answer_count?: number
          author_id?: string
          best_answer_id?: string | null
          body?: string
          category_id?: string | null
          created_at?: string
          id?: string
          is_resolved?: boolean
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_best_answer"
            columns: ["best_answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reactions: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          id: string
          kind: Database["public"]["Enums"]["reaction_kind"]
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          id?: string
          kind: Database["public"]["Enums"]["reaction_kind"]
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_kind"]
          id?: string
          kind?: Database["public"]["Enums"]["reaction_kind"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          details: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          id: string
          reason: string
          reporter_id: string
          resolved_by: string | null
          status: Database["public"]["Enums"]["report_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          id?: string
          reason: string
          reporter_id: string
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          details?: string | null
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_kind"]
          id?: string
          reason?: string
          reporter_id?: string
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      taggables: {
        Row: {
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          tag_id: string
        }
        Insert: {
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_kind"]
          tag_id: string
        }
        Update: {
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_kind"]
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "taggables_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          usage_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          usage_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          usage_count?: number
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          badge_id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          badge_id: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          badge_id?: string
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
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verifications: {
        Row: {
          created_at: string
          document_url: string | null
          full_name: string
          id: string
          reason: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_url?: string | null
          full_name: string
          id?: string
          reason?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_url?: string | null
          full_name?: string
          id?: string
          reason?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verifications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          author_id: string
          category_id: string | null
          created_at: string
          description: string | null
          duration_sec: number
          id: string
          language: string
          status: Database["public"]["Enums"]["content_status"]
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
          views: number
        }
        Insert: {
          author_id: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_sec?: number
          id?: string
          language?: string
          status?: Database["public"]["Enums"]["content_status"]
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
          views?: number
        }
        Update: {
          author_id?: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_sec?: number
          id?: string
          language?: string
          status?: Database["public"]["Enums"]["content_status"]
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "videos_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profile_email: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hn_my_dashboard: { Args: { _app_key?: string }; Returns: string }
      hn_public_stats: { Args: never; Returns: Json }
      hn_track_visit: {
        Args: { _app_key?: string; _path?: string; _session_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      content_status: "draft" | "published" | "archived" | "flagged"
      entity_kind:
        | "article"
        | "forum_topic"
        | "video"
        | "question"
        | "answer"
        | "comment"
        | "group"
      notification_type:
        | "reply"
        | "comment"
        | "like"
        | "follow"
        | "mention"
        | "best_answer"
        | "message"
        | "verification"
        | "system"
      reaction_kind: "like" | "upvote" | "downvote" | "bookmark"
      report_status: "open" | "reviewing" | "resolved" | "dismissed"
      verification_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      content_status: ["draft", "published", "archived", "flagged"],
      entity_kind: [
        "article",
        "forum_topic",
        "video",
        "question",
        "answer",
        "comment",
        "group",
      ],
      notification_type: [
        "reply",
        "comment",
        "like",
        "follow",
        "mention",
        "best_answer",
        "message",
        "verification",
        "system",
      ],
      reaction_kind: ["like", "upvote", "downvote", "bookmark"],
      report_status: ["open", "reviewing", "resolved", "dismissed"],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
