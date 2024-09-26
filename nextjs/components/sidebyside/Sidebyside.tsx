import React, { ReactNode } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatCard, { StatCardProps } from '../stat-card/StatCard';

interface SidebysideProps {
  eyebrow?: string;
  layout?: string;
  title: string;
  summary?: string;
  link?: {
    url?: string;
    title?: string;
  };
  media: ReactNode;
  modifier?: string;
  stat1?: StatCardProps;
  stat2?: StatCardProps;
}

export default function Sidebyside({
  eyebrow,
  layout,
  title,
  summary,
  link,
  media,
  modifier,
  stat1,
  stat2
}: SidebysideProps) {
  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 ${modifier ?? 'container my-6 lg:my-20'} ${layout === 'right' ? 'lg:flex-row-reverse' : ''}`}>
      <div className="w-full lg:w-1/2">
        {media}
      </div>
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col gap-4">
        {eyebrow && (
          <div className="flex">
            <Badge variant="secondary" className="sidebyside-badge uppercase inline-flex">
              {eyebrow}
            </Badge>
          </div>
        )}
        <h2 className="text-3xl font-bold">{title}</h2>
        {summary && (
          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        )}
        {link?.url && (
          <div className="flex">
            <Button variant="default" asChild>
              <a href={link.url}>
                {link.title ?? 'Read more'}
              </a>
            </Button>
          </div>
        )}
        {(stat1 || stat2) && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {stat1 && <StatCard {...stat1} modifier='w-full sm:w-1/2 border-0 shadow-none' />}
            {stat2 && <StatCard {...stat2} modifier='w-full sm:w-1/2 border-0 shadow-none' />}
          </div>
        )}
      </div>
    </div>
  );
}
