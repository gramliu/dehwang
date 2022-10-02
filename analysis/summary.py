from transformers import PegasusForConditionalGeneration, PegasusTokenizer


# See https://paperswithcode.com/dataset/xsum
model_name = "google/pegasus-xsum"
torch_device = "cpu"
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)


def summarize(text):
    batch = tokenizer.prepare_seq2seq_batch(
        text, truncation=True, padding="longest", return_tensors="pt"
    )
    translated = model.generate(**batch)
    return tokenizer.batch_decode(translated, skip_special_tokens=True)
