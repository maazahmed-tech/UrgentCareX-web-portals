# UrgentCareX Admin Panel - Comprehensive Requirements Document

**Document Purpose:** Define the complete scope and requirements for completing the Admin Panel
**Date:** January 22, 2026
**Status:** Admin Panel needs implementation review

---

## Executive Summary

UrgentCareX is a healthcare platform with three portals:
1. **Admin Panel** - For UrgentCareX staff to monitor platform health and manage users
2. **Facility Portal** - For urgent care centers/clinics to manage their profiles and subscriptions
3. **Doctor Portal** - For individual doctors to manage profiles, availability, appointments, and subscriptions

The **Doctor Portal** and **Facility Portal** are complete with all working screens. The **Admin Panel** has the basic structure and needs verification/completion.

---

## Platform Overview

### Business Model
- **Target Users:** Urgent care facilities, clinics, individual doctors
- **Revenue Model:** Subscription-based ($49/month or $499/year for both facilities and doctors)
- **Trial Period:** 14-day free trial (card required at signup)

### Key Metrics (from Dashboard)
- Total Users: 1,247+
- Facilities: 89
- Doctors: 156
- Active Subscriptions: 198
- Subscription breakdown: Trial (23), Monthly (112), Annual (63)

---

## Doctor Portal - Complete

### Navigation (Sidebar)
1. Dashboard
2. Profile
3. Availability
4. Appointments
5. Subscription
6. Settings
7. Help & Support

### All Screens Working
- Dashboard with stats, schedule, performance charts
- Profile with tabs (Basic Info, Education & Training, Credentials, Patient Reviews)
- Availability Calendar
- Appointments (Today, Upcoming, Past, Calendar Week views)
- Subscription & Billing
- Settings (Security, Policies)
- Help & Support

---

## Facility Portal - Complete

### Navigation (Sidebar)
1. Dashboard
2. Profile
3. Insurance & Payers
4. Subscription
5. Settings
6. Help & Support

### All Screens Working
- Dashboard with stats, performance charts
- Profile with tabs (Basic Info, Operations, Patient Reviews)
- Insurance & Payers management
- Subscription & Billing
- Settings (Security, Policies)
- Help & Support with FAQs

---

## Admin Panel - Current State

### Navigation (Sidebar)
1. Dashboard
2. Facilities
3. Doctors
4. Settings

### Existing Screens

| Screen | Route | Status | Description |
|--------|-------|--------|-------------|
| Admin Login | `/admin` | Working | Email/password login with demo credentials |
| Admin Dashboard | `/admin/dashboard` | Working | Stats cards, subscription summary, recent activity |
| Facilities List | `/admin/facilities` | Working | Search, filter, table view of facilities |
| Facility Details | `/admin/facilities/:id` | Needs Testing | Read-only view of facility details |
| Doctors List | `/admin/doctors` | Working | Search, filter by specialty/status, table view |
| Doctor Details | `/admin/doctors/:id` | Needs Testing | Read-only view of doctor details |
| Settings | `/admin/settings` | Working | Profile info, security settings |
| Change Password | `/admin/change-password` | Needs Testing | Password change form |

---

## Admin Panel - Detailed Requirements

### 1. Dashboard (S-A002) - COMPLETE
**Current Features:**
- 4 metric cards: Total Users, Facilities, Doctors, Active Subscriptions
- Subscription Summary: Trial (14-day), Monthly, Annual counts
- Recent Activity feed showing registrations and signups

### 2. Facilities List (S-A003) - COMPLETE
**Current Features:**
- Search bar for facilities
- Status filter dropdown (All Status)
- Table columns: Facility name, email, phone, Location, Doctors count, Status, Subscription type, Joined date
- Status badges (Active/Inactive)
- Subscription badges (Annual/Monthly)

### 3. Facility Details (S-A004) - NEEDS VERIFICATION
**Required Features (per PROJECT_REQUIREMENTS.md):**
- Read-only view of facility profile
- Facility name, address, contact info
- Operating hours
- Services offered
- Subscription info (plan type, billing date)
- List of associated doctors (read-only)

### 4. Doctors List (S-A005) - COMPLETE
**Current Features:**
- Search bar for doctors
- Specialty filter dropdown
- Status filter dropdown
- Table columns: Doctor name, email, phone, Specialty, Facility, Patients count, Rating, Status
- Status badges (Active/Inactive)

### 5. Doctor Details (S-A006) - NEEDS VERIFICATION
**Required Features (per PROJECT_REQUIREMENTS.md):**
- Read-only view of doctor profile
- Name, specialty, contact info
- Credentials and licenses
- Facility affiliation (if any)
- Patient count and rating
- Subscription status

### 6. Settings (S-A007) - COMPLETE
**Current Features:**
- Profile Information section: Full Name, Email Address, Phone Number
- Save Changes / Cancel buttons
- Security section

### 7. Change Password (S-A008) - NEEDS VERIFICATION
**Required Features:**
- Current password field
- New password field
- Confirm new password field
- Password strength indicator (optional)
- Submit/Cancel buttons

---

## Design System (Reference)

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Dark | #1F2937 | Headers, buttons, sidebar, text |
| Secondary | #6B7280 | Secondary text, icons |
| Light Gray | #F3F4F6 | Backgrounds, cards |
| Border | #E5E7EB | Borders, dividers |
| White | #FFFFFF | Card backgrounds |
| Success | #10B981 | Active status, approvals |
| Warning | #F59E0B | Pending status |
| Error | #EF4444 | Errors, rejections |

### Typography
| Style | Size | Weight |
|-------|------|--------|
| H1 | 28px | Bold |
| H2 | 24px | Semibold |
| H3 | 20px | Semibold |
| Body | 16px | Regular |
| Caption | 14px | Regular |
| Small | 12px | Regular |

### Components
- Input Field: 44px height, 8px radius
- Primary Button: 44px height, 8px radius
- Card: Auto height, 12px radius
- Sidebar Width: 256px (expanded) / 64px (collapsed)
- Top Header: 64px height

---

## Technical Stack

- **Framework:** React with TypeScript
- **Routing:** React Router
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Charts:** Recharts
- **Styling:** Tailwind CSS
- **State Management:** React useState/useEffect (no Redux)
- **Auth:** Mock authentication with localStorage

---

## Demo Credentials

| Portal | Email | Password |
|--------|-------|----------|
| Admin | admin@urgentcarex.com | password123 |
| Facility | facility@downtownmed.com | password123 |
| Doctor | dr.johnson@downtownmed.com | password123 |

---

## Implementation Priority

### High Priority
1. Verify Admin Facility Details page works and displays all required info
2. Verify Admin Doctor Details page works and displays all required info
3. Verify Admin Change Password page works correctly

### Medium Priority
1. Add any missing data fields to detail pages
2. Ensure consistent styling across all admin screens

### Low Priority
1. Add loading states where missing
2. Improve error handling
3. Add empty state messages

---

## Summary

**Admin Panel Status:** 8 screens defined, all components exist in codebase
**Doctor Portal:** Complete (all screens working)
**Facility Portal:** Complete (all screens working)

The main work needed is to verify the Admin Panel detail pages (Facility Details, Doctor Details) and Change Password page work correctly and display all required information as specified in PROJECT_REQUIREMENTS.md.
