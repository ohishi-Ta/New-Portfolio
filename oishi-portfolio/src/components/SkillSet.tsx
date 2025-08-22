'use client';

// src/components/SkillSet.tsx
import React, { useState, useEffect, useRef } from 'react';

type Skill = {
  name: string;
  level: number;
  color: string;
};

const SkillSet = () => {
  const frontendSkills = [
    { name: 'HTML/CSS', level: 90, color: 'text-orange-500' },
    { name: 'JavaScript・jQuery', level: 80, color: 'text-yellow-500' },
    { name: 'TypeScript', level: 60, color: 'text-blue-500' },
    { name: 'React', level: 60, color: 'text-blue-600' },
    { name: 'Next.js', level: 60, color: 'text-indigo-500' },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 30, color: 'text-green-600' },
    { name: 'Python', level: 30, color: 'text-green-900' },
    { name: 'PHP ', level: 50, color: 'text-purple-800' },
  ];

  const infraSkills = [
    { name: 'AWS', level: 80, color: 'text-orange-400' },
    { name: 'Docker', level: 60, color: 'text-blue-700' },
  ];
  
  const cmsSkills = [
    { name: 'WordPress', level: 90, color: 'text-blue-900' },
    { name: 'MovableType', level: 90, color: 'text-blue-400' },
    { name: 'MicroCMS', level: 60, color: 'text-sky-400' },
    { name: 'PowerCMS', level: 80, color: 'text-stone-400' },
    { name: 'PowerCMS X', level: 50, color: 'text-stone-600' },
    { name: 'HeartCore', level: 70, color: 'text-red-600' },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderSkills = (skills: Skill[]) => {
    return skills.map((skill, index) => (
      <div 
        key={index} 
        className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200/30 hover:shadow-md hover:bg-white/80 transition-all duration-300 text-center"
      >
        <div className="relative w-16 h-16 mx-auto mb-3">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              className="stroke-gray-200"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              className={skill.color}
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="100"
              strokeLinecap="round"
              style={{
                strokeDashoffset: isVisible ? 100 - skill.level : 100,
                transition: isVisible ? 'stroke-dashoffset 1s ease-out' : 'none'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-xs font-semibold text-gray-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: isVisible ? 'opacity 1s ease-out 0.5s' : 'none'
              }}
            >
              {skill.level}%
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 text-sm font-figtree">
          {skill.name}
        </h3>
      </div>
    ));
  };

  return (
    <div className="mb-8 md:mb-12" ref={sectionRef}>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 font-figtree">
        SKILL SET
      </h3>
      
      {/* フロントエンド */}
      <div className="mb-8">
        <h4 className="text-lg md:text-xl font-bold mb-4 font-figtree">
          Frontend
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {renderSkills(frontendSkills)}
        </div>
      </div>

      {/* バックエンド */}
      <div className="mb-8">
        <h4 className="text-lg md:text-xl font-bold mb-4 font-figtree">
          Backend
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {renderSkills(backendSkills)}
        </div>
      </div>

      {/* インフラ */}
      <div className="mb-8">
        <h4 className="text-lg md:text-xl font-bold mb-4 font-figtree">
          Infrastructure
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {renderSkills(infraSkills)}
        </div>
      </div>

      {/* CMS */}
      <div className="mb-8">
        <h4 className="text-lg md:text-xl font-bold mb-4 font-figtree">
          CMS
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {renderSkills(cmsSkills)}
        </div>
      </div>

      {/* その他 */}
      <div className="mb-8">
        <h4 className="text-lg md:text-xl font-bold mb-4 font-figtree">
          その他
        </h4>
        <ul>
            <li>Git</li>
            <li>Webアクセシビリティ</li>
            <li>Figma</li>
            <li>Adobe Photoshop</li>
            <li>Adobe Illustrator</li>
            <li>Adobe XD</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillSet;