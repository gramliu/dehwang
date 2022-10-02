from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

TOP_N = 5
_model = SentenceTransformer("distilbert-base-nli-mean-tokens")


def generate_stances(text):
    n_gram_range = (1, 2)
    stop_words = "english"

    count = CountVectorizer(ngram_range=n_gram_range, stop_words=stop_words).fit([text])
    candidates = count.get_feature_names()

    # manual adjustment to avoid "filipinx(s)" showing up in every stance
    candidates = [candidate for candidate in candidates if "filipin" not in candidate]

    doc_embedding = _model.encode([text])
    candidate_embeddings = _model.encode(candidates)

    distances = cosine_similarity(doc_embedding, candidate_embeddings)
    return [candidates[index] for index in distances.argsort()[0][-TOP_N:]]
