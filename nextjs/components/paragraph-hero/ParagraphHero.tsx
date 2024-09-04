import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphHeroFragment } from '@/graphql/fragments/paragraph';
import { getImage } from '../helpers/Utilities';
import { TextFragment, LinkFragment } from '@/graphql/fragments/misc';
import Button from '../button/Button';
import './ParagraphHero.scss';

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
  modifier?: string
}

export default function ParagraphHero({ paragraph, modifier }: ParagraphHeroProps) {
  const { requiredMedia, heroLayout, heading, summary, link } = readFragment(ParagraphHeroFragment, paragraph);
  const summaryFragment = readFragment(TextFragment, summary);
  const linkFragment = readFragment(LinkFragment, link);
  const headingFragment = readFragment(TextFragment, heading);

  return (
    <div className={modifier ?? 'container'}>
      <div className={`mb-6 mb-lg-12 text-center ${modifier || ''}`}>
        {heroLayout === 'image_top' && requiredMedia && (
          <div className="image-top row">
            <div className="mb-4 mb-lg-8 d-flex justify-content-center align-items-center">
              {getImage(requiredMedia, 'img-fluid', ['HEROS', 'HEROLX2'])}
            </div>
          </div>
        )}

        {headingFragment && (
          <div className="col-lg-8 mx-auto">
            <h1 className="heading display-5 fw-semibold mb-4 mb-lg-4" dangerouslySetInnerHTML={{ __html: headingFragment?.value ?? '' }} />
          </div>
        )}

        <div className="col-lg-8 mx-auto">
          {summaryFragment && (
            <div className="lead mb-2 mb-lg-4" dangerouslySetInnerHTML={{ __html: summaryFragment?.value ?? '' }} />
          )}

          {(linkFragment?.url && linkFragment?.title) && (
            <div className="d-grid gap-2 d-flex justify-content-center">
              {link && (
                <Button
                  url={linkFragment?.url}
                  text={linkFragment?.title}
                  modifier="btn-primary"
                />
              )}
            </div>
          )}
        </div>

        {heroLayout === 'image_bottom' && requiredMedia && (
          <div className="image-bottom row mt-6">
            <div className="d-flex justify-content-center align-items-center">
              {getImage(requiredMedia, 'img-fluid', ['HEROS', 'HEROLX2'])}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
