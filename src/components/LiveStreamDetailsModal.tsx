'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { FaVideo, FaUser, FaClock, FaPlay, FaDollarSign, FaTrophy, FaCalendar, FaYoutube } from 'react-icons/fa';
import { LiveStream } from './LiveStreamTable';

interface LiveStreamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  livestream: LiveStream | null;
  onUpdateResult?: (id: number, result: number) => void;
  isUpdating?: boolean;
  locale: string;
}

// Simple translation function
function getTranslations(locale: string) {
  const translations = {
    en: {
      title: 'Livestream Details',
      id: 'ID',
      streamer: 'Người phát',
      youtubeLink: 'Link YouTube',
      duration: 'Thời lượng',
      startTime: 'Start Time',
      endTime: 'End Time',
      totalPlay: 'Tổng lượt chơi',
      total: 'Tổng tiền',
      result: 'Kết quả',
      status: 'Trạng thái',
      createdAt: 'Ngày tạo',
      updatedAt: 'Last Updated',
      updateResult: 'Update Result',
      selectResult: 'Chọn kết quả',
      win: 'Thắng',
      lose: 'Thua',
      close: 'Close',
      update: 'Update',
      updating: 'Updating...',
      watchVideo: 'Watch Video',
      noData: 'No data available'
    },
    vi: {
      title: 'Chi tiết Livestream',
      id: 'ID',
      streamer: 'Người phát',
      youtubeLink: 'Link YouTube',
      duration: 'Thời lượng',
      startTime: 'Thời gian bắt đầu',
      endTime: 'Thời gian kết thúc',
      totalPlay: 'Tổng lượt chơi',
      total: 'Tổng tiền',
      result: 'Kết quả',
      status: 'Trạng thái',
      createdAt: 'Ngày tạo',
      updatedAt: 'Cập nhật lần cuối',
      updateResult: 'Cập nhật kết quả',
      selectResult: 'Chọn kết quả',
      win: 'Thắng',
      lose: 'Thua',
      close: 'Đóng',
      update: 'Cập nhật',
      updating: 'Đang cập nhật...',
      watchVideo: 'Xem Video',
      noData: 'Không có dữ liệu'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

// Format currency in Vietnamese dong
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date and time
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Calculate duration between start and end time
const formatDuration = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Get result badge
const getResultBadge = (result: number) => {
  switch (result) {
    case 0:
      return <Badge variant="default">Chưa xác định</Badge>;
    case 1:
      return <Badge variant="warning">Thua</Badge>;
    case 2:
      return <Badge variant="success">Thắng</Badge>;
    default:
      return null;
  }
};

// Get status progress
const getStatusProgress = (status: string) => {
  switch (status) {
    case 'progress':
      return { percent: 75, color: 'bg-blue-500', text: 'Đang tiến hành', animated: true };
    case 'completed':
      return { percent: 100, color: 'bg-green-500', text: 'Hoàn thành', animated: false };
    default:
      return { percent: 0, color: 'bg-gray-500', text: status, animated: true };
  }
};

export default function LiveStreamDetailsModal({
  isOpen,
  onClose,
  livestream,
  onUpdateResult,
  isUpdating = false,
  locale
}: Readonly<LiveStreamDetailsModalProps>) {
  const [selectedResult, setSelectedResult] = useState<string>('');
  const t = getTranslations(locale);

  if (!livestream) {
    return null;
  }

  const isProgressStatus = livestream.status === 'progress';
  const statusProgress = getStatusProgress(livestream.status);
  
  const resultOptions = [
    { value: '', label: t.selectResult },
    { value: '2', label: t.win },
    { value: '1', label: t.lose }
  ];

  const handleUpdateResult = () => {
    if (selectedResult && onUpdateResult) {
      onUpdateResult(livestream.id, parseInt(selectedResult));
      setSelectedResult('');
    }
  };

  const handleClose = () => {
    setSelectedResult('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t.title}
      size="lg"
      className="overflow-visible"
    >
      <div className="space-y-6 overflow-visible">
        {/* Header Info */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FaVideo className="mr-2 h-5 w-5 text-indigo-600" />
              #{livestream.id}
            </h3>
            {getResultBadge(livestream.result)}
          </div>
        </div>

        {/* Main Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Streamer */}
            <div className="flex items-center">
              <FaUser className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.streamer}</p>
                <p className="text-base text-gray-900">{livestream.streamer}</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center">
              <FaClock className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.duration}</p>
                <p className="text-base text-gray-900">
                  {formatDuration(livestream.startTime, livestream.endTime)}
                </p>
              </div>
            </div>

            {/* Total Play */}
            <div className="flex items-center">
              <FaPlay className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.totalPlay}</p>
                <p className="text-base text-gray-900">
                  {livestream.totalPlay.toLocaleString()} plays
                </p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="flex items-center">
              <FaDollarSign className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.total}</p>
                <p className="text-base font-medium text-green-600">
                  {formatCurrency(livestream.total)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Start Time */}
            <div className="flex items-center">
              <FaCalendar className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.startTime}</p>
                <p className="text-base text-gray-900">
                  {formatDateTime(livestream.startTime)}
                </p>
              </div>
            </div>

            {/* End Time */}
            <div className="flex items-center">
              <FaCalendar className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.endTime}</p>
                <p className="text-base text-gray-900">
                  {formatDateTime(livestream.endTime)}
                </p>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-center">
              <FaCalendar className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.createdAt}</p>
                <p className="text-base text-gray-900">
                  {formatDateTime(livestream.createdAt)}
                </p>
              </div>
            </div>

            {/* Updated At */}
            <div className="flex items-center">
              <FaCalendar className="mr-3 h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.updatedAt}</p>
                <p className="text-base text-gray-900">
                  {formatDateTime(livestream.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Link */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaYoutube className="mr-3 h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t.youtubeLink}</p>
                <p className="text-base text-blue-600 truncate max-w-md">
                  {livestream.youtubeLink}
                </p>
              </div>
            </div>
            <a
              href={livestream.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaYoutube className="mr-2 h-4 w-4 text-red-500" />
              {t.watchVideo}
            </a>
          </div>
        </div>

        {/* Status */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <FaTrophy className="mr-3 h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2">{t.status}</p>
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700">{statusProgress.text}</span>
                  <span className="text-xs text-gray-500">{statusProgress.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${statusProgress.color} ${
                      statusProgress.animated ? 'progress-stripes' : ''
                    }`}
                    style={{ width: `${statusProgress.percent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Result Section */}
        {isProgressStatus && (
          <div className="border-t border-gray-200 pt-4">
            <div className="bg-blue-50 rounded-lg p-4 relative overflow-visible">
              <h4 className="text-sm font-medium text-blue-900 mb-3 flex items-center">
                <FaTrophy className="mr-2 h-4 w-4" />
                {t.updateResult}
              </h4>
              <div className="flex items-center space-x-3 relative overflow-visible">
                <div className="flex-1 relative overflow-visible">
                  <Select
                    options={resultOptions}
                    value={selectedResult}
                    onChange={setSelectedResult}
                    disabled={isUpdating}
                    className="text-sm relative overflow-visible"
                  />
                </div>
                <Button
                  onClick={handleUpdateResult}
                  disabled={!selectedResult || isUpdating}
                  className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                >
                  {isUpdating ? t.updating : t.update}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end pt-6 border-t border-gray-200 pb-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isUpdating}
          >
            {t.close}
          </Button>
        </div>
      </div>
    </Modal>
  );
} 