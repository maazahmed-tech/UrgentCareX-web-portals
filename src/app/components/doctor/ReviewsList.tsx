import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';
import { DoctorLayout } from '@/app/components/layouts/DoctorLayout';

export function ReviewsList() {
  const reviews = [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      rating: 5,
      date: 'Jan 18, 2026',
      comment: 'Dr. Smith was incredibly thorough and took the time to answer all my questions. Highly recommend!',
      verified: true
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      rating: 5,
      date: 'Jan 15, 2026',
      comment: 'Excellent care and very professional. The wait time was minimal and the staff was friendly.',
      verified: true
    },
    {
      id: 3,
      patientName: 'Emily Rodriguez',
      rating: 4,
      date: 'Jan 12, 2026',
      comment: 'Great experience overall. Very knowledgeable doctor who explained everything clearly.',
      verified: true
    },
    {
      id: 4,
      patientName: 'David Thompson',
      rating: 5,
      date: 'Jan 10, 2026',
      comment: 'Best doctor I\'ve had in years. Compassionate, patient, and truly cares about his patients.',
      verified: true
    },
    {
      id: 5,
      patientName: 'Lisa Anderson',
      rating: 4,
      date: 'Jan 8, 2026',
      comment: 'Very satisfied with the care received. The doctor was attentive and professional.',
      verified: true
    },
    {
      id: 6,
      patientName: 'James Wilson',
      rating: 5,
      date: 'Jan 5, 2026',
      comment: 'Outstanding service! Dr. Smith took the time to understand my concerns and provided excellent treatment.',
      verified: true
    },
    {
      id: 7,
      patientName: 'Maria Garcia',
      rating: 5,
      date: 'Jan 3, 2026',
      comment: 'Wonderful experience from start to finish. Highly professional and caring.',
      verified: true
    },
    {
      id: 8,
      patientName: 'Robert Taylor',
      rating: 4,
      date: 'Dec 28, 2025',
      comment: 'Good experience. The doctor was knowledgeable and helpful.',
      verified: true
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#E5E7EB]'
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <DoctorLayout title="Patient Reviews">
      <div className="max-w-4xl">
        {/* Summary Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-2">Patient Reviews</h2>
              <p className="text-[#6B7280]">{reviews.length} total reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-8 h-8 fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-3xl font-semibold text-[#1F2937]">{averageRating}</span>
              </div>
              <p className="text-sm text-[#6B7280]">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-[#6B7280]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-[#1F2937]">{review.patientName}</h3>
                        {review.verified && (
                          <span className="px-2 py-0.5 bg-[#D1FAE5] text-[#10B981] text-xs rounded">
                            Verified Patient
                          </span>
                        )}
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-[#6B7280]">{review.date}</span>
                  </div>
                  <p className="text-[#1F2937] leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DoctorLayout>
  );
}