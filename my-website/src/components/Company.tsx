import './Company.css';

interface CompanyProps {
  image: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  descriptionColor?: string;
  imageOpacity?: number;
  imageSize?: number;
}

const Company = ({
  image,
  title,
  description,
  imagePosition = 'left',
  backgroundColor = '#1a1a1a',
  textColor = '#ffffff',
  descriptionColor = '#c8c8c8',
  imageOpacity = 0.5,
  imageSize = 100
}: CompanyProps) => {
  return (
    <div
      className="company-card-wrapper"
      style={{
        '--bg-color': backgroundColor,
        '--text-color': textColor,
        '--desc-color': descriptionColor,
        '--image-opacity': imageOpacity,
        '--image-size': `${imageSize}px`
      } as React.CSSProperties}>
      <div className={`company-card ${imagePosition === 'right' ? 'image-right' : ''}`}>
        <div className="company-image-container">
          <img src={image} alt={title} className="company-image" />
          <div className="company-gradient"></div>
        </div>
        <div className="company-content">
          <h3 className="company-title">{title}</h3>
          <p className="company-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Company;
