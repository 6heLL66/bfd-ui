'use client';

import { motion } from 'framer-motion';

const PrivacyNoticePage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-default to-secondary bg-clip-text text-transparent">Privacy Notice</h1>
        <p className="text-foreground-secondary mt-2">Last updated: March 2024</p>
      </div>

      <div className="space-y-8 text-foreground-primary">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-foreground-secondary leading-relaxed">
            Beraflow DAO (`we,` `us,` or `our`) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Notice explains how we
            collect, use, and protect your data when you use our decentralized finance (DeFi) platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <div className="space-y-4 text-foreground-secondary">
            <p className="leading-relaxed">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Wallet addresses and transaction data on the blockchain</li>
              <li>Smart contract interactions and token balances</li>
              <li>Technical information such as your IP address and device information</li>
              <li>Usage data and platform interaction metrics</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <div className="space-y-4 text-foreground-secondary">
            <p className="leading-relaxed">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Facilitating and processing transactions on our platform</li>
              <li>Providing and improving our DeFi services</li>
              <li>Ensuring platform security and preventing fraud</li>
              <li>Analyzing platform usage and performance</li>
              <li>Complying with legal obligations and regulatory requirements</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-foreground-secondary leading-relaxed">
            We implement appropriate technical and organizational measures to protect your information. However, please note that while we strive to use commercially acceptable
            means to protect your personal information, we cannot guarantee its absolute security. All blockchain transactions are public by nature and visible to anyone on the
            network.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Smart Contracts and Blockchain Data</h2>
          <p className="text-foreground-secondary leading-relaxed">
            Our platform operates on the Berachain blockchain. All transactions and interactions with our smart contracts are permanently recorded on the blockchain and are
            publicly visible. This includes wallet addresses, transaction amounts, and contract interactions. Please be aware that this information cannot be modified or deleted
            due to the immutable nature of blockchain technology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-foreground-secondary leading-relaxed">
            We may use third-party services for analytics, infrastructure, and other operational purposes. These services may collect and process your information according to
            their own privacy policies. We encourage you to review the privacy policies of these third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <div className="space-y-4 text-foreground-secondary">
            <p className="leading-relaxed">You have certain rights regarding your personal information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to request deletion of your information (where possible)</li>
              <li>Right to object to processing of your information</li>
              <li>Right to data portability</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to Privacy Notice</h2>
          <p className="text-foreground-secondary leading-relaxed">
            We may update this Privacy Notice from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of
            any material changes by posting the updated Privacy Notice on our platform with a new effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-foreground-secondary leading-relaxed">
            If you have any questions about this Privacy Notice or our privacy practices, please contact us through our official Discord channel or by creating an issue in our
            GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">DeFi Platform Features and Data Collection</h2>
          <div className="space-y-4 text-foreground-secondary">
            <p className="leading-relaxed">
              Our platform includes various DeFi features such as token swaps, token sales, and treasury management. For these features, we collect and process:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Token swap data including slippage settings and deadlines</li>
              <li>Sale participation records and allocation information</li>
              <li>Treasury interaction data and transaction history</li>
              <li>Price impact calculations and liquidity pool interactions</li>
              <li>Token balances and allowance settings</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Automated Data Processing</h2>
          <p className="text-foreground-secondary leading-relaxed">
            Our platform utilizes automated processing for various DeFi operations. This includes smart contract interactions for token swaps, automated market making calculations,
            price impact assessments, and slippage protection mechanisms. These processes are essential for providing our core services and ensuring optimal trading conditions for
            users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Wallet Integration and Security</h2>
          <p className="text-foreground-secondary leading-relaxed">
            Our platform requires wallet connection for accessing core features. When you connect your wallet, we collect necessary wallet-related information to facilitate
            transactions and ensure security. This includes your wallet address, transaction signatures, and smart contract interaction history. We implement additional security
            measures such as transaction confirmation requirements and slippage protection to safeguard your assets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Retention and Blockchain Permanence</h2>
          <p className="text-foreground-secondary leading-relaxed">
            Due to the nature of blockchain technology, transaction data and smart contract interactions on the Berachain network are permanently stored and publicly accessible.
            While we may delete certain off-chain data upon request, on-chain data including wallet addresses, transaction amounts, and contract interactions cannot be deleted or
            modified. We retain user interaction data and analytics for a period of 12 months to improve our services and comply with regulatory requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Regulatory Compliance and DeFi Operations</h2>
          <div className="space-y-4 text-foreground-secondary">
            <p className="leading-relaxed">
              As a DeFi platform, we are committed to maintaining compliance with applicable regulations while preserving the decentralized nature of our services. We may collect
              and retain certain information to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Monitor and prevent potential market manipulation</li>
              <li>Implement anti-money laundering (AML) measures</li>
              <li>Comply with regulatory reporting requirements</li>
              <li>Assist in security audits and incident investigations</li>
              <li>Maintain platform integrity and user safety</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default PrivacyNoticePage;
