import React from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { useTranslation } from 'react-i18next';

const TimeAgo = ({ createdAt }) => {
  const { t } = useTranslation('common');

  const calculateTimeAgo = () => {
    const currentTime = moment();
    const postTime = moment(createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ');

    const duration = moment.duration(currentTime.diff(postTime));
    const minutesAgo = duration.asMinutes();
    const hoursAgo = duration.asHours();
    const daysAgo = duration.asDays();

    if (minutesAgo < 1) {
      const secondsAgo = Math.floor(duration.asSeconds());
      return `${secondsAgo} ${t('recruiter.time.seconds')} ${t('recruiter.time.ago')}`;
    } else if (hoursAgo < 1) {
      const minutesAgo = Math.floor(duration.asMinutes());
      return `${minutesAgo} ${t('recruiter.time.minutes')} ${t('recruiter.time.ago')}`;
    } else if (daysAgo < 1) {
      const hoursAgo = Math.floor(duration.asHours());
      return `${hoursAgo} ${t('recruiter.time.hours')} ${t('recruiter.time.ago')}`;
    } else {
      const daysAgo = Math.floor(duration.asDays());
      return `${daysAgo} ${t('recruiter.time.days')} ${t('recruiter.time.ago')}`;
    }
  };

  const timeAgo = calculateTimeAgo();
  return <span className="ml-2">{timeAgo}</span>;
};

export default TimeAgo;
