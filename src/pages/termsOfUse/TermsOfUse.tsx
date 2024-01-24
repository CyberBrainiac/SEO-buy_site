import React, { useEffect } from 'react';
import style from './termsOfUse.module.scss';

const TermsOfUse: React.FC = () => {
  useEffect(() => {
    document.title = 'Connect with SEO-Buy for Digital Excellence';
    const newMetaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    newMetaDescription.content = `Have questions or ready to embark on a digital journey? Reach out to our dedicated team. Let's connect for tailored SEO solutions, link-building strategies, and custom content creation.`;
  }, []);

  return (
    <section className="termsOfUse">
      <div className={style.container}>
        <h1>Terms of Use</h1>

        <h2>Legal</h2>
        <p>
          By using this site, you agree to these terms of use stated below. If you do not agree to
          these terms of use, please do not use the site.
        </p>

        <h2>Use of Materials</h2>
        <p>
          This site is owned and operated by SEO-Buy (referred to as `SEO-Buy`, `we`, `us`, or `our`
          herein). No material from the site may be copied, reproduced, republished, uploaded,
          posed, transmitted, or distributed in any way, except pictures exclude SEO-Buy logo.
          Modification of the materials or use of the materials for any other purpose is a violation
          of SEO-Buy copyright and other proprietary rights. The use of any such material on any
          other website or networked computer environment is prohibited. Except as otherwise
          indicated on this site and except for the trademarks, service marks, and trade names of
          other companies that are displayed on this site, all trademarks, service marks, and trade
          names are the property of SEO-Buy.
        </p>

        <p>
          In the event that you use any software from the site, SEO-Buy does not transfer title to
          the Software to you. SEO-Buy retains full and complete title to the Software, and all
          intellectual property rights therein. You may not redistribute, sell, decompile, reverse
          engineer, disassemble, or otherwise reduce the Software to a human-perceivable form.
        </p>

        <h2>Disclaimer</h2>
        <p>
          SEO-Buy shall not be liable for any damages or injury resulting from your access to, or
          inability to access, this site, or your reliance on any information provided at this site.
          Without limiting the foregoing, everything on the site is provided to you `as is` without
          warranty of any kind, either expressed or implied, including, but not limited to, the
          implied warranties of merchantability, fitness for a particular purpose, or
          non-infringement. SEO-Buy does not warrant that the functions contained in the materials
          will be uninterrupted or error-free, that defects will be corrected, or that this site or
          the server that makes it available are free of viruses or other harmful components.
          SEO-Buy does not warrant or make any representations regarding the use or the results of
          the use of the materials on this site in terms of their correctness, accuracy,
          reliability, or otherwise.
        </p>

        <h2>Liability</h2>
        <p>
          Under no circumstances, including, but not limited to, negligence, shall SEO-Buy be liable
          for any special or consequential damages that result from the use of, or the inability to
          use, the materials on this site, even if SEO-Buy or a SEO-Buy authorized representative
          has been advised of the possibility of such damages. In no event shall SEO-Buy have any
          liability to you for damages, losses, and causes of action for accessing this site.
        </p>

        <h2>Other</h2>
        <p>
          All claims, disputes, or disagreements which may arise out of the interpretation,
          performance or in any way relating to your use of this site, shall be submitted to our
          contacts. SEO-Buy also assumes no responsibility and shall not be liable for any damages
          to, or viruses that may infect your computer equipment or other property on account of
          your access to, use of, or browsing on the site or downloading of any materials, data,
          text, images, video, or audio from the site.
        </p>
      </div>
    </section>
  );
};

export default TermsOfUse;
