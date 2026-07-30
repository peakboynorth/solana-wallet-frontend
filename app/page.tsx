'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';
import WalletConnectButton from '@/components/WalletConnectButton';
import bs58 from 'bs58';

export default function Home() {
    const { connection } = useConnection();
    const { publicKey, signMessage } = useWallet();
    const [loadingAirdrop, setLoadingAirdrop] = useState(false);
    const [signStatus, setSignStatus] = useState<string>('');
    const [airdropStatus, setAirdropStatus] = useState<string>('');

    const requestAirdrop = async () => {
        if (!publicKey) return;
        try {
            setLoadingAirdrop(true);
            setAirdropStatus('Requesting airdrop...');
            
            const signature = await connection.requestAirdrop(
                publicKey,
                LAMPORTS_PER_SOL
            );
            
            const latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                signature,
                ...latestBlockhash
            });
            
            setAirdropStatus('Airdrop successful!');
            setTimeout(() => setAirdropStatus(''), 5000);
        } catch (error: any) {
            console.error('Airdrop failed', error);
            setAirdropStatus(`Airdrop failed: ${error.message}`);
        } finally {
            setLoadingAirdrop(false);
        }
    };

    const handleSignMessage = async () => {
        if (!publicKey || !signMessage) return;
        try {
            setSignStatus('Signing message...');
            const message = new TextEncoder().encode('Hello from Solana dApp Boilerplate!');
            const signature = await signMessage(message);
            
            setSignStatus(`Signed! Sig: ${bs58.encode(signature).slice(0, 16)}...`);
            setTimeout(() => setSignStatus(''), 5000);
        } catch (error: any) {
            console.error('Signing failed', error);
            setSignStatus(`Signing failed: ${error.message}`);
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 font-sans">
            <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center transform rotate-12 shadow-sm">
                        <span className="text-white font-bold text-xl -rotate-12">S</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Solana dApp</h1>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase">Devnet</span>
                        </div>
                    </div>
                </div>
                <WalletConnectButton />
            </header>

            <div className="max-w-4xl mx-auto p-6 mt-12">
                {!publicKey ? (
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-16 text-center shadow-sm">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight">Welcome to Web3</h2>
                        <p className="text-zinc-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                            Connect your Solana wallet to access the dashboard, sign messages, and interact with the Devnet.
                        </p>
                        <div className="flex justify-center">
                            <WalletConnectButton />
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-xl font-bold mb-3 tracking-tight">Devnet Airdrop</h3>
                            <p className="text-zinc-500 mb-8 leading-relaxed">
                                Get 1 SOL on Devnet for testing your dApp. Limit 1 request per minute.
                            </p>
                            <button
                                onClick={requestAirdrop}
                                disabled={loadingAirdrop}
                                className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 font-medium py-3.5 rounded-xl transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                            >
                                {loadingAirdrop ? 'Requesting...' : 'Request 1 SOL'}
                            </button>
                            {airdropStatus && (
                                <p className={`text-sm mt-4 text-center font-medium ${airdropStatus.includes('failed') ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {airdropStatus}
                                </p>
                            )}
                        </div>

                        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-xl font-bold mb-3 tracking-tight">Sign Message</h3>
                            <p className="text-zinc-500 mb-8 leading-relaxed">
                                Prove wallet ownership by cryptographically signing a fixed message.
                            </p>
                            <button
                                onClick={handleSignMessage}
                                className="w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-medium py-3.5 rounded-xl transition-colors cursor-pointer shadow-sm"
                            >
                                Sign &quot;Hello World&quot;
                            </button>
                            {signStatus && (
                                <p className={`text-sm mt-4 text-center font-medium ${signStatus.includes('failed') ? 'text-red-500' : 'text-indigo-500'}`}>
                                    {signStatus}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
