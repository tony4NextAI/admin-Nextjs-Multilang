'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FaVideo, FaUser, FaLink, FaClock } from 'react-icons/fa';

interface CreateLiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    youtubeLink: string;
    streamer: string;
    startTime: string;
    endTime: string;
  }) => void;
  isLoading?: boolean;
  locale: string;
}

// Simple translation function
function getTranslations(locale: string) {
  const translations = {
    en: {
      title: 'Create New Livestream',
      youtubeLink: 'YouTube Link',
      youtubeLinkPlaceholder: 'https://youtu.be/...',
      streamer: 'Streamer Name',
      streamerPlaceholder: 'Enter streamer name',
      startTime: 'Start Time (Vietnam Time)',
      endTime: 'End Time (Vietnam Time)',
      cancel: 'Cancel',
      create: 'Create Livestream',
      creating: 'Creating...',
      required: 'This field is required',
    },
    vi: {
      title: 'Tạo Livestream Mới',
      youtubeLink: 'Liên kết YouTube',
      youtubeLinkPlaceholder: 'https://youtu.be/...',
      streamer: 'Tên Streamer',
      streamerPlaceholder: 'Nhập tên streamer',
      startTime: 'Thời gian bắt đầu (Vietnam Time)',
      endTime: 'Thời gian kết thúc (Vietnam Time)',
      cancel: 'Hủy',
      create: 'Tạo Livestream',
      creating: 'Đang tạo...',
      required: 'Trường này là bắt buộc',
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default function CreateLiveStreamModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  locale
}: Readonly<CreateLiveStreamModalProps>) {
  const [formData, setFormData] = useState({
    youtubeLink: '',
    streamer: '',
    startTime: '',
    endTime: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = getTranslations(locale);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.youtubeLink.trim()) {
      newErrors.youtubeLink = t.required;
    } else if (!formData.youtubeLink.includes('youtube.com') && !formData.youtubeLink.includes('youtu.be')) {
      newErrors.youtubeLink = 'Please enter a valid YouTube URL';
    }
    
    if (!formData.streamer.trim()) {
      newErrors.streamer = t.required;
    }
    
    if (!formData.startTime) {
      newErrors.startTime = t.required;
    }
    
    if (!formData.endTime) {
      newErrors.endTime = t.required;
    }
    
    // Check if end time is after start time
    if (formData.startTime && formData.endTime) {
      const startDate = new Date(formData.startTime);
      const endDate = new Date(formData.endTime);
      if (endDate <= startDate) {
        newErrors.endTime = 'End time must be after start time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert local Vietnamese time to UTC for API
    const convertToUTC = (localDateTime: string) => {
      const localDate = new Date(localDateTime);
      // Since the user's local time is already Vietnamese time (UTC+7),
      // we just convert it to ISO string which will be in UTC
      return localDate.toISOString();
    };

    const submitData = {
      ...formData,
      startTime: convertToUTC(formData.startTime),
      endTime: convertToUTC(formData.endTime),
    };

    onSubmit(submitData);
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({
      youtubeLink: '',
      streamer: '',
      startTime: '',
      endTime: ''
    });
    setErrors({});
    onClose();
  };

  // Format datetime-local input value using local time
  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Set default start time to now (local time), end time to 1 hour later
  React.useEffect(() => {
    if (isOpen && !formData.startTime) {
      const now = new Date(); // This is in user's local time
      const later = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later
      
      setFormData(prev => ({
        ...prev,
        startTime: formatDateTimeLocal(now),
        endTime: formatDateTimeLocal(later)
      }));
    }
  }, [isOpen, formData.startTime]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t.title}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* YouTube Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaLink className="inline mr-2" />
            {t.youtubeLink}
          </label>
          <Input
            type="url"
            value={formData.youtubeLink}
            onChange={handleInputChange('youtubeLink')}
            placeholder={t.youtubeLinkPlaceholder}
            className={errors.youtubeLink ? 'border-red-500' : ''}
          />
          {errors.youtubeLink && (
            <p className="mt-1 text-sm text-red-600">{errors.youtubeLink}</p>
          )}
        </div>

        {/* Streamer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaUser className="inline mr-2" />
            {t.streamer}
          </label>
          <Input
            type="text"
            value={formData.streamer}
            onChange={handleInputChange('streamer')}
            placeholder={t.streamerPlaceholder}
            className={errors.streamer ? 'border-red-500' : ''}
          />
          {errors.streamer && (
            <p className="mt-1 text-sm text-red-600">{errors.streamer}</p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaClock className="inline mr-2" />
            {t.startTime}
          </label>
          <Input
            type="datetime-local"
            value={formData.startTime}
            onChange={handleInputChange('startTime')}
            className={errors.startTime ? 'border-red-500' : ''}
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
          )}
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaClock className="inline mr-2" />
            {t.endTime}
          </label>
          <Input
            type="datetime-local"
            value={formData.endTime}
            onChange={handleInputChange('endTime')}
            className={errors.endTime ? 'border-red-500' : ''}
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            {t.cancel}
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <FaVideo className="mr-2 h-4 w-4" />
            {isLoading ? t.creating : t.create}
          </Button>
        </div>
      </form>
    </Modal>
  );
} 