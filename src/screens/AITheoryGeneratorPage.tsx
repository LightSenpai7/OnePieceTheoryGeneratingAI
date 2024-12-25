import React, { useState, useEffect } from 'react';
import { generateOnePieceTheory } from '../api/api';
import { ITheory } from '../types/ITheory';
import { CategoryType } from '../types/CategoryType';

const AITheoryGenerator = () => {
    const [category, setCategory] = useState<CategoryType>('');
    const [userThoughts, setUserThoughts] = useState<string>('');
    const [generatedTheory, setGeneratedTheory] = useState<ITheory | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const canGenerateTheory = () => {
        const lastGenerated = localStorage.getItem('lastGenerated');
        const theoryCount = localStorage.getItem('theoryCount');
        const currentTime = new Date().getTime();
        const oneHourInMillis = 60 * 60 * 1000;

        if (lastGenerated) {
            const timePassed = currentTime - parseInt(lastGenerated);
            if (timePassed < oneHourInMillis) {
                const timeRemaining = oneHourInMillis - timePassed;
                setError(`You can generate a new theory in ${Math.ceil(timeRemaining / 60000)} minutes.`);
                return false;
            }
        }

        if (theoryCount && parseInt(theoryCount) >= 1) {
            setError('You have already generated a theory this hour.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!canGenerateTheory()) return;

        if (!category || !userThoughts.trim()) return;

        setLoading(true);
        try {
            const theory = await generateOnePieceTheory(category, userThoughts);
            const currentTime = new Date().getTime();

            localStorage.setItem('lastGenerated', currentTime.toString());
            localStorage.setItem('theoryCount', '1');

            setGeneratedTheory({
                content: theory,
                timestamp: new Date().toLocaleString()
            });
            setError(null);
        } catch (error) {
            setGeneratedTheory({
                content: 'Error: Unable to generate theory. Please try again.',
                timestamp: new Date().toLocaleString()
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const lastGenerated = localStorage.getItem('lastGenerated');
            const currentTime = new Date().getTime();
            const oneHourInMillis = 60 * 60 * 1000;

            if (lastGenerated) {
                const timePassed = currentTime - parseInt(lastGenerated);
                if (timePassed >= oneHourInMillis) {
                    localStorage.setItem('theoryCount', '0');
                }
            }
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mb-4">One Piece Theory Generator</h1>

                    {error && (
                        <div className="alert alert-warning" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                id="category"
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as CategoryType)}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="character">Character</option>
                                <option value="episode">Episode</option>
                                <option value="universe">Universe</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="thoughts" className="form-label">Your Thoughts</label>
                            <textarea
                                id="thoughts"
                                className="form-control"
                                rows={5}
                                value={userThoughts}
                                onChange={(e) => setUserThoughts(e.target.value)}
                                placeholder="Share your One Piece theory ideas..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading || !category || !userThoughts.trim()}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Generating Theory...
                                </>
                            ) : 'Generate Theory'}
                        </button>
                    </form>

                    {generatedTheory && (
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-0">Generated Theory</h5>
                                <small className="text-muted">{generatedTheory.timestamp}</small>
                            </div>
                            <div className="card-body">
                                {/* Render HTML content */}
                                <div className="theory-content">
                                    <div
                                        className="white-space-pre-wrap mb-0"
                                        dangerouslySetInnerHTML={{ __html: generatedTheory.content }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AITheoryGenerator;
